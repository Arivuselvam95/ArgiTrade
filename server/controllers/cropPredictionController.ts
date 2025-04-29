import { Request, Response } from 'express';
import { PriceData } from '../models/PriceData';
import { spawn } from 'child_process';
import path from 'path';

export const getPricePrediction = async (req: Request, res: Response) => {
  try {
    // Fetch all price data from MongoDB
    const priceData = await PriceData.find().lean();
    
    // Process data for frontend visualization
    const cropPriceChanges = processPriceData(priceData);
    
    res.json(cropPriceChanges);
  } catch (error) {
    console.error('Error fetching price prediction data:', error);
    res.status(500).json({ message: 'Error fetching price prediction data' });
  }
};

export const analyzePrice = async (req: Request, res: Response) => {
  try {
    const scriptPath = path.join(__dirname, '../services/pythonScripts/price_prediction.py');
    
    const process = spawn('python', [scriptPath, JSON.stringify(req.body)]);
    
    let dataString = '';
    
    process.stdout.on('data', (data) => {
      dataString += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
    
    process.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Error running price prediction model' });
      }
      
      try {
        const results = JSON.parse(dataString);
        res.json(results);
      } catch (error) {
        console.error('Error parsing Python script output:', error);
        res.status(500).json({ message: 'Error processing price prediction results' });
      }
    });
  } catch (error) {
    console.error('Error running price prediction:', error);
    res.status(500).json({ message: 'Server error running price prediction' });
  }
};

// Helper function to process price data
const processPriceData = (priceData: any[]) => {
  // Group by crop
  const cropGroups = priceData.reduce((acc: any, item: any) => {
    if (!acc[item.crop_name]) {
      acc[item.crop_name] = [];
    }
    acc[item.crop_name].push(item);
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
      return a.demand === 'High Demand' ? -1 : 1;
    }
    return b.priceChangePercentage - a.priceChangePercentage;
  });
  
  return {
    profitableCrops: sortedByProfit.slice(0, 5),
    demandableCrops: sortedByDemand.slice(0, 5),
    allCrops: cropPriceChanges
  };
};

// Helper function to determine demand level
const determineDemand = (priceChangePercentage: number): string => {
  if (priceChangePercentage > 15) return 'High Demand';
  if (priceChangePercentage > 5) return 'Medium Demand';
  return 'Low Demand';
};

// Helper function to categorize crops
const getCropCategory = (cropName: string): string => {
  const vegetables = ['Tomato', 'Onion', 'Potato', 'Green Chili', 'Brinjal', 'Carrot'];
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
  const grains = ['Rice', 'Wheat', 'Millet'];
  const cashCrops = ['Cotton', 'Sugarcane', 'Coffee'];
  
  if (vegetables.includes(cropName)) return 'Vegetable';
  if (fruits.includes(cropName)) return 'Fruit';
  if (grains.includes(cropName)) return 'Grain';
  if (cashCrops.includes(cropName)) return 'Cash Crop';
  
  return 'Other';
};
