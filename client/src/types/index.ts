// Common types used throughout the application

export interface Crop {
  id: number;
  cropName: string;
  currentPrice: number;
  predictedPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  category: string;
  demand: string;
}

export interface ProfitableCrop {
  cropName: string;
  profitPercentage: number;
}

export interface DemandableCrop {
  cropName: string;
  demand: string;
}

export interface PricePredictionData {
  profitableCrops: Crop[];
  demandableCrops: Crop[];
  allCrops: Crop[];
}

export interface RegionalData {
  district: string;
  avgWindSpeed: number;
  avgTemp: number;
  weatherPatterns: string;
  majorSoilType1: string;
  soil1Ph: number;
  soil1Nitrogen: number;
  soil1Phosphorus: number;
  soil1Potassium: number;
  majorSoilType2?: string;
  soil2Ph?: number;
  soil2Nitrogen?: number;
  soil2Phosphorus?: number;
  soil2Potassium?: number;
}

export interface CropSuggestionFormData {
  district: string;
  soilType: string;
  phLevel: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface SuggestedCrop {
  name: string;
  suitability: string;
  harvestDays: number;
  currentPrice: number;
  predictedPrice: number;
  expectedYield: string;
  profitMargin: number;
}

export interface CropSuggestionResult {
  district: string;
  soilType: string;
  phLevel: number;
  suggestedCrops: SuggestedCrop[];
}

export interface Product {
  id: number;
  userId: number;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  distance?: number;
  imageUrl?: string;
  sellerName: string;
  sellerInitials: string;
  createdAt: string;
  isAvailable: boolean;
}

export interface ProductFilters {
  category: string;
  minPrice?: number;
  maxPrice?: number;
  location: string;
  searchTerm?: string;
  sortBy: string;
}

export interface Investment {
  id: number;
  userId: number;
  title: string;
  description: string;
  cropType: string;
  investmentPeriod: number;
  minInvestment: number;
  totalShares: number;
  availableShares: number;
  expectedReturn: number;
  farmExperience: number;
  location: string;
  imageUrl?: string;
  createdAt: string;
  isActive: boolean;
  farmerName: string;
  farmerInitials: string;
}

export interface InvestmentSummaryData {
  totalInvestment: number;
  activeInvestments: number;
  currentReturns: number;
  returnPercentage: number;
}

export interface UserInvestment {
  id: number;
  userId: number;
  investmentId: number;
  amount: number;
  shares: number;
  purchaseDate: string;
  status: string;
  investment?: Investment;
}

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  direction: SortOrder;
}

export interface District {
  id: number;
  name: string;
}

export interface SoilType {
  id: number;
  name: string;
}
