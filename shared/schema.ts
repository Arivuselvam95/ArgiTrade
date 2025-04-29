import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("farmer"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Price data for crop price prediction
export const priceData = pgTable("price_data", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  month: integer("month").notNull(),
  year: integer("year").notNull(),
  rainfall: doublePrecision("rainfall").notNull(),
  wpi: doublePrecision("wpi").notNull(),
  price: doublePrecision("price").notNull(),
});

// Regional data for crop suggestion
export const regionalData = pgTable("regional_data", {
  id: serial("id").primaryKey(),
  district: text("district").notNull(),
  avgWindSpeed: doublePrecision("avg_wind_speed").notNull(),
  avgTemp: doublePrecision("avg_temp").notNull(),
  weatherPatterns: text("weather_patterns").notNull(),
  majorSoilType1: text("major_soil_type1").notNull(),
  soil1Ph: doublePrecision("soil1_ph").notNull(),
  soil1Nitrogen: doublePrecision("soil1_nitrogen").notNull(),
  soil1Phosphorus: doublePrecision("soil1_phosphorus").notNull(), 
  soil1Potassium: doublePrecision("soil1_potassium").notNull(),
  majorSoilType2: text("major_soil_type2"),
  soil2Ph: doublePrecision("soil2_ph"),
  soil2Nitrogen: doublePrecision("soil2_nitrogen"),
  soil2Phosphorus: doublePrecision("soil2_phosphorus"),
  soil2Potassium: doublePrecision("soil2_potassium"),
});

// Crop data for crop suggestion
export const cropData = pgTable("crop_data", {
  id: serial("id").primaryKey(),
  cropName: text("crop_name").notNull(),
  tempMin: doublePrecision("temp_min").notNull(),
  tempMax: doublePrecision("temp_max").notNull(),
  rainfallMin: doublePrecision("rainfall_min").notNull(),
  rainfallMax: doublePrecision("rainfall_max").notNull(),
  humidityMin: doublePrecision("humidity_min").notNull(),
  humidityMax: doublePrecision("humidity_max").notNull(),
  windSpeedMin: doublePrecision("wind_speed_min").notNull(),
  windSpeedMax: doublePrecision("wind_speed_max").notNull(),
  phMin: doublePrecision("ph_min").notNull(),
  phMax: doublePrecision("ph_max").notNull(),
  nitrogen: doublePrecision("nitrogen").notNull(),
  phosphorus: doublePrecision("phosphorus").notNull(),
  potassium: doublePrecision("potassium").notNull(),
  soilTypeEncoded: integer("soil_type_encoded").notNull(),
  regionEncoded: integer("region_encoded").notNull(),
  seasonEncoded: integer("season_encoded").notNull(),
  growingDays: integer("growing_days").notNull(),
  expectedYield: text("expected_yield").notNull(),
  category: text("category").notNull(),
});

// Products for marketplace
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: doublePrecision("price").notNull(),
  unit: text("unit").notNull(),
  quantity: doublePrecision("quantity").notNull(),
  location: text("location").notNull(),
  locationCoordinates: json("location_coordinates"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  isAvailable: boolean("is_available").default(true),
});

// Investments for agri-trade
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  cropType: text("crop_type").notNull(),
  investmentPeriod: integer("investment_period").notNull(), // in months
  minInvestment: doublePrecision("min_investment").notNull(),
  totalShares: integer("total_shares").notNull(),
  availableShares: integer("available_shares").notNull(),
  expectedReturn: doublePrecision("expected_return").notNull(), // percentage
  farmExperience: integer("farm_experience").notNull(), // in years
  location: text("location").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// User investments
export const userInvestments = pgTable("user_investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  investmentId: integer("investment_id").notNull(),
  amount: doublePrecision("amount").notNull(),
  shares: integer("shares").notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow(),
  status: text("status").notNull().default("active"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertPriceDataSchema = createInsertSchema(priceData).omit({ id: true });
export const insertRegionalDataSchema = createInsertSchema(regionalData).omit({ id: true });
export const insertCropDataSchema = createInsertSchema(cropData).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true });
export const insertInvestmentSchema = createInsertSchema(investments).omit({ id: true, createdAt: true });
export const insertUserInvestmentSchema = createInsertSchema(userInvestments).omit({ id: true, purchaseDate: true });

// Crop suggestion form schema
export const cropSuggestionFormSchema = z.object({
  district: z.string().min(1, "District is required"),
  soilType: z.string().min(1, "Soil type is required"),
  phLevel: z.number().min(0).max(14),
  nitrogen: z.number().min(0),
  phosphorus: z.number().min(0),
  potassium: z.number().min(0),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type PriceData = typeof priceData.$inferSelect;
export type InsertPriceData = z.infer<typeof insertPriceDataSchema>;

export type RegionalData = typeof regionalData.$inferSelect;
export type InsertRegionalData = z.infer<typeof insertRegionalDataSchema>;

export type CropData = typeof cropData.$inferSelect;
export type InsertCropData = z.infer<typeof insertCropDataSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type UserInvestment = typeof userInvestments.$inferSelect;
export type InsertUserInvestment = z.infer<typeof insertUserInvestmentSchema>;

export type CropSuggestionForm = z.infer<typeof cropSuggestionFormSchema>;
