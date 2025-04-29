import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { z } from "zod";
import { cropSuggestionFormSchema, insertProductSchema, insertInvestmentSchema, insertUserInvestmentSchema } from "@shared/schema";

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Routes for Crop Price Prediction
  app.get("/api/price-prediction", async (req, res) => {
    try {
      // Get data from in-memory storage
      const priceData = await storage.getPriceData();
      
      // Process the data for frontend visualization
      // Group by crop type to find profitable and demandable crops
      const cropPriceChanges = processPriceData(priceData);
      
      res.json(cropPriceChanges);
    } catch (error) {
      console.error("Error fetching price prediction data:", error);
      res.status(500).json({ message: "Error fetching price prediction data" });
    }
  });

  // Run Python ML script for price prediction
  app.post("/api/price-prediction/analyze", async (req, res) => {
    try {
      const scriptPath = path.join(__dirname, "services", "pythonScripts", "price_prediction.py");
      
      const process = spawn("python", [scriptPath, JSON.stringify(req.body)]);
      
      let dataString = "";
      
      process.stdout.on("data", (data) => {
        dataString += data.toString();
      });
      
      process.stderr.on("data", (data) => {
        console.error(`Python script stderr: ${data}`);
      });
      
      process.on("close", (code) => {
        if (code !== 0) {
          return res.status(500).json({ message: "Error running price prediction model" });
        }
        
        try {
          const results = JSON.parse(dataString);
          res.json(results);
        } catch (error) {
          console.error("Error parsing Python script output:", error);
          res.status(500).json({ message: "Error processing price prediction results" });
        }
      });
    } catch (error) {
      console.error("Error running price prediction:", error);
      res.status(500).json({ message: "Server error running price prediction" });
    }
  });

  // Routes for Regional Crop Suggestion
  app.get("/api/districts", async (req, res) => {
    try {
      // Get districts from mock data
      const { mockDistricts } = await import("./models/mockData");
      
      res.json(mockDistricts);
    } catch (error) {
      console.error("Error fetching districts:", error);
      res.status(500).json({ message: "Error fetching districts data" });
    }
  });

  app.get("/api/regional-data/:district", async (req, res) => {
    try {
      const { district } = req.params;
      
      // Get regional data from storage
      const regionalData = await storage.getRegionalDataByDistrict(district);
      
      if (!regionalData) {
        return res.status(404).json({ message: "District data not found" });
      }
      
      res.json(regionalData);
    } catch (error) {
      console.error("Error fetching regional data:", error);
      res.status(500).json({ message: "Error fetching regional data" });
    }
  });

  app.post("/api/crop-suggestion", async (req, res) => {
    try {
      // Validate input data
      const validatedData = cropSuggestionFormSchema.parse(req.body);
      
      // Get regional data for the district
      const regionalData = await storage.getRegionalDataByDistrict(validatedData.district);
      
      if (!regionalData) {
        return res.status(404).json({ message: "District data not found" });
      }
      
      // Run Python script for crop suggestion
      const scriptPath = path.join(__dirname, "services", "pythonScripts", "crop_suggestion.py");
      
      // Combine form data with regional data for analysis
      const analysisData = {
        ...validatedData,
        avgWindSpeed: regionalData.avgWindSpeed,
        avgTemp: regionalData.avgTemp,
        weatherPatterns: regionalData.weatherPatterns,
      };
      
      const process = spawn("python", [scriptPath, JSON.stringify(analysisData)]);
      
      let dataString = "";
      
      process.stdout.on("data", (data) => {
        dataString += data.toString();
      });
      
      process.stderr.on("data", (data) => {
        console.error(`Python script stderr: ${data}`);
      });
      
      process.on("close", (code) => {
        if (code !== 0) {
          return res.status(500).json({ message: "Error running crop suggestion model" });
        }
        
        try {
          const results = JSON.parse(dataString);
          
          // Fetch additional data for each suggested crop
          Promise.all(results.suggestedCrops.map(async (crop: any) => {
            // Get price data for this crop from storage
            const priceDatas = await storage.getPriceDataByCrop(crop.name);
            const priceData = priceDatas.length > 0 ? priceDatas[priceDatas.length - 1] : null;
            
            crop.currentPrice = priceData?.price || 0;
            crop.predictedPrice = priceData?.price ? priceData.price * (1 + (crop.profitMargin / 100)) : 0;
            return crop;
          }))
          .then(completedCrops => {
            res.json({
              district: validatedData.district,
              soilType: validatedData.soilType,
              phLevel: validatedData.phLevel,
              suggestedCrops: completedCrops
            });
          });
        } catch (error) {
          console.error("Error parsing Python script output:", error);
          res.status(500).json({ message: "Error processing crop suggestion results" });
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Error running crop suggestion:", error);
      res.status(500).json({ message: "Server error running crop suggestion" });
    }
  });

  // Routes for Farm Hub - Marketplace
  app.get("/api/products", async (req, res) => {
    try {
      const { category, minPrice, maxPrice, location } = req.query;
      
      // Get all products from storage
      let products = await storage.getProducts();
      
      // Filter products based on query parameters
      // Only return available products
      products = products.filter(product => product.isAvailable);
      
      if (category && category !== "All Categories") {
        products = products.filter(product => product.category === category);
      }
      
      if (minPrice && !isNaN(Number(minPrice))) {
        products = products.filter(product => product.price >= Number(minPrice));
      }
      
      if (maxPrice && !isNaN(Number(maxPrice))) {
        products = products.filter(product => product.price <= Number(maxPrice));
      }
      
      if (location && location !== "All Locations") {
        products = products.filter(product => product.location === location);
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      
      // Create new product in storage
      const newProduct = await storage.createProduct(validatedData);
      
      res.status(201).json(newProduct);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product" });
    }
  });

  // Routes for Farm Hub - Agri-Trade
  app.get("/api/investments", async (req, res) => {
    try {
      // Get all investments from storage
      const investments = await storage.getInvestments();
      
      // Filter only active investments
      const activeInvestments = investments.filter(investment => investment.isActive);
      
      res.json(activeInvestments);
    } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ message: "Error fetching investments" });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const validatedData = insertInvestmentSchema.parse(req.body);
      
      // Create new investment in storage
      const newInvestment = await storage.createInvestment(validatedData);
      
      res.status(201).json(newInvestment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      console.error("Error creating investment:", error);
      res.status(500).json({ message: "Error creating investment" });
    }
  });

  app.get("/api/user-investments/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      if (!userId || isNaN(Number(userId))) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const userInvestments = await storage.getUserInvestments(Number(userId));
      
      // Get full investment details for each user investment
      const completeUserInvestments = await Promise.all(
        userInvestments.map(async (userInvestment) => {
          const investment = await storage.getInvestmentById(userInvestment.investmentId);
          return {
            ...userInvestment,
            investment
          };
        })
      );
      
      res.json(completeUserInvestments);
    } catch (error) {
      console.error("Error fetching user investments:", error);
      res.status(500).json({ message: "Error fetching user investments" });
    }
  });

  app.post("/api/user-investments", async (req, res) => {
    try {
      const validatedData = insertUserInvestmentSchema.parse(req.body);
      
      // Check if investment exists and has enough available shares
      const investment = await storage.getInvestmentById(validatedData.investmentId);
      
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      
      if (investment.availableShares < validatedData.shares) {
        return res.status(400).json({ message: "Not enough shares available" });
      }
      
      // Update investment available shares
      await storage.updateInvestment(
        validatedData.investmentId, 
        { availableShares: investment.availableShares - validatedData.shares }
      );
      
      // Create user investment
      const newUserInvestment = await storage.createUserInvestment(validatedData);
      
      res.status(201).json(newUserInvestment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user investment data", errors: error.errors });
      }
      console.error("Error creating user investment:", error);
      res.status(500).json({ message: "Error creating user investment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to process price data
function processPriceData(priceData: any[]) {
  // Group by crop
  const cropGroups = priceData.reduce((acc: any, item: any) => {
    if (!acc[item.cropName]) {
      acc[item.cropName] = [];
    }
    acc[item.cropName].push(item);
    return acc;
  }, {});
  
  // Calculate price changes for each crop
  const cropPriceChanges = Object.keys(cropGroups).map(cropName => {
    const cropData = cropGroups[cropName];
    
    // Sort by year and month
    cropData.sort((a: any, b: any) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
    
    // Calculate price change percentage
    const oldestPrice = cropData[0].price;
    const newestPrice = cropData[cropData.length - 1].price;
    const priceChange = newestPrice - oldestPrice;
    const priceChangePercentage = (priceChange / oldestPrice) * 100;
    
    // Predict future price (simple linear extrapolation)
    const predictedPrice = newestPrice * (1 + (priceChangePercentage / 100));
    
    return {
      cropName,
      currentPrice: newestPrice,
      predictedPrice,
      priceChange,
      priceChangePercentage,
      category: getCropCategory(cropName),
      demand: determineDemand(priceChangePercentage)
    };
  });
  
  // Sort by profit potential (price change percentage)
  const sortedByProfit = [...cropPriceChanges].sort((a, b) => b.priceChangePercentage - a.priceChangePercentage);
  
  // Sort by demand (also based on price change but could be more complex in real app)
  const sortedByDemand = [...cropPriceChanges].sort((a, b) => {
    if (a.demand !== b.demand) {
      return a.demand === "High Demand" ? -1 : 1;
    }
    return b.priceChangePercentage - a.priceChangePercentage;
  });
  
  return {
    profitableCrops: sortedByProfit.slice(0, 5),
    demandableCrops: sortedByDemand.slice(0, 5),
    allCrops: cropPriceChanges
  };
}

// Helper function to determine demand level
function determineDemand(priceChangePercentage: number): string {
  if (priceChangePercentage > 15) return "High Demand";
  if (priceChangePercentage > 5) return "Medium Demand";
  return "Low Demand";
}

// Helper function to categorize crops
function getCropCategory(cropName: string): string {
  const vegetables = ["Tomato", "Onion", "Potato", "Green Chili", "Brinjal", "Carrot"];
  const fruits = ["Apple", "Banana", "Orange", "Mango"];
  const grains = ["Rice", "Wheat", "Millet"];
  const cashCrops = ["Cotton", "Sugarcane", "Coffee"];
  
  if (vegetables.includes(cropName)) return "Vegetable";
  if (fruits.includes(cropName)) return "Fruit";
  if (grains.includes(cropName)) return "Grain";
  if (cashCrops.includes(cropName)) return "Cash Crop";
  
  return "Other";
}
