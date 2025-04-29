import { 
  User, 
  InsertUser, 
  PriceData, 
  InsertPriceData,
  RegionalData,
  InsertRegionalData,
  CropData,
  InsertCropData,
  Product,
  InsertProduct,
  Investment,
  InsertInvestment,
  UserInvestment,
  InsertUserInvestment
} from "@shared/schema";
import mongoose from 'mongoose';

// Using in-memory storage for now, MongoDB connection commented out
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/AgriTrade";
// 
// mongoose.connect(MONGODB_URI)
//  .then(() => console.log("Connected to MongoDB"))
//  .catch(err => console.error("MongoDB connection error:", err));

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Price data operations
  getPriceData(): Promise<PriceData[]>;
  getPriceDataByCrop(cropName: string): Promise<PriceData[]>;
  createPriceData(data: InsertPriceData): Promise<PriceData>;
  
  // Regional data operations
  getRegionalData(): Promise<RegionalData[]>;
  getRegionalDataByDistrict(district: string): Promise<RegionalData | undefined>;
  createRegionalData(data: InsertRegionalData): Promise<RegionalData>;
  
  // Crop data operations
  getCropData(): Promise<CropData[]>;
  getCropDataByCropName(cropName: string): Promise<CropData | undefined>;
  createCropData(data: InsertCropData): Promise<CropData>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByUser(userId: number): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Investment operations
  getInvestments(): Promise<Investment[]>;
  getInvestmentById(id: number): Promise<Investment | undefined>;
  getInvestmentsByUser(userId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined>;
  deleteInvestment(id: number): Promise<boolean>;
  
  // User Investment operations
  getUserInvestments(userId: number): Promise<UserInvestment[]>;
  createUserInvestment(userInvestment: InsertUserInvestment): Promise<UserInvestment>;
  updateUserInvestment(id: number, status: string): Promise<UserInvestment | undefined>;
}

export class MemStorage implements IStorage {
  // In-memory maps
  private users: Map<number, User>;
  private priceData: Map<number, PriceData>;
  private regionalData: Map<number, RegionalData>;
  private cropData: Map<number, CropData>;
  private products: Map<number, Product>;
  private investments: Map<number, Investment>;
  private userInvestments: Map<number, UserInvestment>;
  
  // Counters for IDs
  private userIdCounter: number;
  private priceDataIdCounter: number;
  private regionalDataIdCounter: number;
  private cropDataIdCounter: number;
  private productIdCounter: number;
  private investmentIdCounter: number;
  private userInvestmentIdCounter: number;

  constructor() {
    this.users = new Map();
    this.priceData = new Map();
    this.regionalData = new Map();
    this.cropData = new Map();
    this.products = new Map();
    this.investments = new Map();
    this.userInvestments = new Map();
    
    this.userIdCounter = 1;
    this.priceDataIdCounter = 1;
    this.regionalDataIdCounter = 1;
    this.cropDataIdCounter = 1;
    this.productIdCounter = 1;
    this.investmentIdCounter = 1;
    this.userInvestmentIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id, createdAt: new Date() };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Price data operations
  async getPriceData(): Promise<PriceData[]> {
    return Array.from(this.priceData.values());
  }
  
  async getPriceDataByCrop(cropName: string): Promise<PriceData[]> {
    return Array.from(this.priceData.values()).filter(data => data.cropName === cropName);
  }
  
  async createPriceData(data: InsertPriceData): Promise<PriceData> {
    const id = this.priceDataIdCounter++;
    const newPriceData: PriceData = { ...data, id };
    this.priceData.set(id, newPriceData);
    return newPriceData;
  }
  
  // Regional data operations
  async getRegionalData(): Promise<RegionalData[]> {
    return Array.from(this.regionalData.values());
  }
  
  async getRegionalDataByDistrict(district: string): Promise<RegionalData | undefined> {
    return Array.from(this.regionalData.values()).find(data => data.district === district);
  }
  
  async createRegionalData(data: InsertRegionalData): Promise<RegionalData> {
    const id = this.regionalDataIdCounter++;
    const newRegionalData: RegionalData = { ...data, id };
    this.regionalData.set(id, newRegionalData);
    return newRegionalData;
  }
  
  // Crop data operations
  async getCropData(): Promise<CropData[]> {
    return Array.from(this.cropData.values());
  }
  
  async getCropDataByCropName(cropName: string): Promise<CropData | undefined> {
    return Array.from(this.cropData.values()).find(data => data.cropName === cropName);
  }
  
  async createCropData(data: InsertCropData): Promise<CropData> {
    const id = this.cropDataIdCounter++;
    const newCropData: CropData = { ...data, id };
    this.cropData.set(id, newCropData);
    return newCropData;
  }
  
  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }
  
  async getProductsByUser(userId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.userId === userId);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const newProduct: Product = { ...product, id, createdAt: new Date() };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct: Product = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Investment operations
  async getInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }
  
  async getInvestmentById(id: number): Promise<Investment | undefined> {
    return this.investments.get(id);
  }
  
  async getInvestmentsByUser(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(investment => investment.userId === userId);
  }
  
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const id = this.investmentIdCounter++;
    const newInvestment: Investment = { ...investment, id, createdAt: new Date() };
    this.investments.set(id, newInvestment);
    return newInvestment;
  }
  
  async updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined> {
    const existingInvestment = this.investments.get(id);
    if (!existingInvestment) return undefined;
    
    const updatedInvestment: Investment = { ...existingInvestment, ...investment };
    this.investments.set(id, updatedInvestment);
    return updatedInvestment;
  }
  
  async deleteInvestment(id: number): Promise<boolean> {
    return this.investments.delete(id);
  }
  
  // User Investment operations
  async getUserInvestments(userId: number): Promise<UserInvestment[]> {
    return Array.from(this.userInvestments.values()).filter(userInvestment => userInvestment.userId === userId);
  }
  
  async createUserInvestment(userInvestment: InsertUserInvestment): Promise<UserInvestment> {
    const id = this.userInvestmentIdCounter++;
    const newUserInvestment: UserInvestment = { ...userInvestment, id, purchaseDate: new Date() };
    this.userInvestments.set(id, newUserInvestment);
    return newUserInvestment;
  }
  
  async updateUserInvestment(id: number, status: string): Promise<UserInvestment | undefined> {
    const existingUserInvestment = this.userInvestments.get(id);
    if (!existingUserInvestment) return undefined;
    
    const updatedUserInvestment: UserInvestment = { ...existingUserInvestment, status };
    this.userInvestments.set(id, updatedUserInvestment);
    return updatedUserInvestment;
  }
}

export const storage = new MemStorage();

// Import mock data to initialize storage
import { 
  mockPriceData, 
  mockDistricts, 
  mockRegionalData, 
  mockCropData, 
  mockProducts, 
  mockInvestments, 
  mockUserInvestments 
} from "./models/mockData";

// Initialize storage with mock data
async function initializeStorage() {
  // Add price data
  for (const priceData of mockPriceData) {
    await storage.createPriceData(priceData);
  }
  
  // Add regional data
  for (const regionalData of mockRegionalData) {
    await storage.createRegionalData(regionalData);
  }
  
  // Add crop data
  for (const cropData of mockCropData) {
    await storage.createCropData(cropData);
  }
  
  // Add products
  for (const product of mockProducts) {
    await storage.createProduct(product);
  }
  
  // Add investments
  for (const investment of mockInvestments) {
    await storage.createInvestment(investment);
  }
  
  // Add user investments
  for (const userInvestment of mockUserInvestments) {
    await storage.createUserInvestment(userInvestment);
  }
  
  console.log("Storage initialized with mock data");
}

// Initialize storage
initializeStorage().catch(err => console.error("Error initializing storage:", err));
