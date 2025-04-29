// Mock data for the application when using in-memory storage

// Mock price data with realistic progression
export const mockPriceData = [
  // Tomato price data (2018-2023)
  ...generateCropPriceData("Tomato", 50, 5), // Base price 50, yearly increase 5
  // Onion price data
  ...generateCropPriceData("Onion", 40, 4),
  // Rice price data
  ...generateCropPriceData("Rice", 35, 2),
  // Potato price data
  ...generateCropPriceData("Potato", 20, 3),
  // Cotton price data (prices much higher per quintal)
  ...generateCropPriceData("Cotton", 5000, 250),
  // Green Chili price data
  ...generateCropPriceData("Green Chili", 70, 6),
  // Brinjal price data
  ...generateCropPriceData("Brinjal", 30, 3),
];

// Mock district data for Tamil Nadu
export const mockDistricts = [
  { id: 1, name: "Chennai" },
  { id: 2, name: "Coimbatore" },
  { id: 3, name: "Madurai" },
  { id: 4, name: "Salem" },
  { id: 5, name: "Tirunelveli" },
  { id: 6, name: "Tiruchirappalli" },
  { id: 7, name: "Erode" },
  { id: 8, name: "Tiruppur" },
  { id: 9, name: "Vellore" },
  { id: 10, name: "Thanjavur" },
];

// Mock regional data
export const mockRegionalData = [
  {
    id: 1,
    district: "Chennai",
    avg_wind_speed: 5.2,
    avg_temp: 28.6,
    weather_patterns: "Coastal",
    major_soil_type1: "Alluvial",
    soil1_ph: 6.8,
    soil1_nitrogen: 80,
    soil1_phosphorus: 45,
    soil1_potassium: 110,
    major_soil_type2: "Clay",
    soil2_ph: 7.2,
    soil2_nitrogen: 65,
    soil2_phosphorus: 50,
    soil2_potassium: 95,
  },
  {
    id: 2,
    district: "Coimbatore",
    avg_wind_speed: 3.8,
    avg_temp: 26.1,
    weather_patterns: "Semi-arid",
    major_soil_type1: "Red",
    soil1_ph: 6.5,
    soil1_nitrogen: 90,
    soil1_phosphorus: 55,
    soil1_potassium: 120,
    major_soil_type2: "Black",
    soil2_ph: 7.0,
    soil2_nitrogen: 75,
    soil2_phosphorus: 60,
    soil2_potassium: 115,
  },
  {
    id: 3,
    district: "Madurai",
    avg_wind_speed: 4.1,
    avg_temp: 29.4,
    weather_patterns: "Hot and dry",
    major_soil_type1: "Black",
    soil1_ph: 7.2,
    soil1_nitrogen: 65,
    soil1_phosphorus: 40,
    soil1_potassium: 85,
    major_soil_type2: "Red",
    soil2_ph: 6.4,
    soil2_nitrogen: 85,
    soil2_phosphorus: 50,
    soil2_potassium: 100,
  },
  {
    id: 4,
    district: "Salem",
    avg_wind_speed: 3.5,
    avg_temp: 27.2,
    weather_patterns: "Subtropical",
    major_soil_type1: "Red",
    soil1_ph: 6.3,
    soil1_nitrogen: 95,
    soil1_phosphorus: 60,
    soil1_potassium: 125,
    major_soil_type2: "Loamy",
    soil2_ph: 6.7,
    soil2_nitrogen: 85,
    soil2_phosphorus: 65,
    soil2_potassium: 115,
  },
  {
    id: 5,
    district: "Tirunelveli",
    avg_wind_speed: 4.8,
    avg_temp: 30.1,
    weather_patterns: "Hot and humid",
    major_soil_type1: "Alluvial",
    soil1_ph: 6.9,
    soil1_nitrogen: 75,
    soil1_phosphorus: 50,
    soil1_potassium: 105,
    major_soil_type2: "Sandy",
    soil2_ph: 6.0,
    soil2_nitrogen: 60,
    soil2_phosphorus: 45,
    soil2_potassium: 80,
  },
];

// Mock crop data
export const mockCropData = [
  {
    id: 1,
    cropName: "Tomato",
    tempMin: 15, tempMax: 35,
    rainfallMin: 600, rainfallMax: 1200,
    humidityMin: 60, humidityMax: 80,
    windSpeedMin: 2, windSpeedMax: 10,
    phMin: 5.5, phMax: 7.5,
    nitrogen: 100, phosphorus: 80, potassium: 120,
    soilTypeEncoded: 1, // Red soil
    regionEncoded: 2, // South region
    seasonEncoded: 1, // Summer
    growingDays: 90,
    expectedYield: "25-30 ton/hectare",
    category: "Vegetable"
  },
  {
    id: 2,
    cropName: "Onion",
    tempMin: 13, tempMax: 30,
    rainfallMin: 500, rainfallMax: 900,
    humidityMin: 50, humidityMax: 70,
    windSpeedMin: 3, windSpeedMax: 12,
    phMin: 6.0, phMax: 7.8,
    nitrogen: 80, phosphorus: 60, potassium: 100,
    soilTypeEncoded: 1, // Red soil
    regionEncoded: 2, // South region
    seasonEncoded: 3, // Winter
    growingDays: 130,
    expectedYield: "20-25 ton/hectare",
    category: "Vegetable"
  },
  {
    id: 3,
    cropName: "Rice",
    tempMin: 20, tempMax: 35,
    rainfallMin: 1000, rainfallMax: 2000,
    humidityMin: 70, humidityMax: 90,
    windSpeedMin: 1, windSpeedMax: 8,
    phMin: 5.5, phMax: 7.0,
    nitrogen: 120, phosphorus: 60, potassium: 80,
    soilTypeEncoded: 2, // Alluvial soil
    regionEncoded: 2, // South region
    seasonEncoded: 2, // Monsoon
    growingDays: 110,
    expectedYield: "5-7 ton/hectare",
    category: "Grain"
  },
  {
    id: 4,
    cropName: "Potato",
    tempMin: 10, tempMax: 25,
    rainfallMin: 500, rainfallMax: 1000,
    humidityMin: 60, humidityMax: 80,
    windSpeedMin: 2, windSpeedMax: 8,
    phMin: 5.0, phMax: 6.5,
    nitrogen: 90, phosphorus: 120, potassium: 150,
    soilTypeEncoded: 3, // Loamy soil
    regionEncoded: 2, // South region
    seasonEncoded: 3, // Winter
    growingDays: 100,
    expectedYield: "20-25 ton/hectare",
    category: "Vegetable"
  },
  {
    id: 5,
    cropName: "Cotton",
    tempMin: 20, tempMax: 40,
    rainfallMin: 600, rainfallMax: 1200,
    humidityMin: 50, humidityMax: 70,
    windSpeedMin: 3, windSpeedMax: 15,
    phMin: 6.0, phMax: 8.0,
    nitrogen: 60, phosphorus: 40, potassium: 80,
    soilTypeEncoded: 4, // Black soil
    regionEncoded: 2, // South region
    seasonEncoded: 1, // Summer
    growingDays: 180,
    expectedYield: "2-3 ton/hectare",
    category: "Cash Crop"
  },
  {
    id: 6,
    cropName: "Green Chili",
    tempMin: 18, tempMax: 35,
    rainfallMin: 600, rainfallMax: 1200,
    humidityMin: 65, humidityMax: 85,
    windSpeedMin: 2, windSpeedMax: 10,
    phMin: 5.5, phMax: 7.0,
    nitrogen: 110, phosphorus: 70, potassium: 130,
    soilTypeEncoded: 1, // Red soil
    regionEncoded: 2, // South region
    seasonEncoded: 1, // Summer
    growingDays: 75,
    expectedYield: "10-12 ton/hectare",
    category: "Vegetable"
  },
  {
    id: 7,
    cropName: "Brinjal",
    tempMin: 17, tempMax: 32,
    rainfallMin: 600, rainfallMax: 1000,
    humidityMin: 60, humidityMax: 80,
    windSpeedMin: 2, windSpeedMax: 10,
    phMin: 5.5, phMax: 7.5,
    nitrogen: 100, phosphorus: 60, potassium: 120,
    soilTypeEncoded: 1, // Red soil
    regionEncoded: 2, // South region
    seasonEncoded: 1, // Summer
    growingDays: 85,
    expectedYield: "25-30 ton/hectare",
    category: "Vegetable"
  },
];

// Mock product data for marketplace
export const mockProducts = [
  {
    id: 1,
    userId: 1,
    name: "Fresh Tomatoes",
    description: "Organically grown tomatoes, harvested yesterday.",
    category: "Vegetable",
    price: 25,
    unit: "kg",
    quantity: 100,
    location: "Coimbatore",
    imageUrl: "https://images.unsplash.com/photo-1546630785-e8534da59c3f",
    createdAt: new Date("2023-04-01T10:00:00Z"),
    isAvailable: true,
    sellerName: "Ravi Kumar",
    sellerInitials: "RK"
  },
  {
    id: 2,
    userId: 2,
    name: "Premium Rice",
    description: "High-quality rice, perfect for daily consumption.",
    category: "Grain",
    price: 45,
    unit: "kg",
    quantity: 500,
    location: "Madurai",
    imageUrl: "https://images.unsplash.com/photo-1594489573833-51dd8a3a452b",
    createdAt: new Date("2023-04-02T14:30:00Z"),
    isAvailable: true,
    sellerName: "Anitha Suresh",
    sellerInitials: "AS"
  },
  {
    id: 3,
    userId: 3,
    name: "Red Onions",
    description: "Fresh red onions from local farm.",
    category: "Vegetable",
    price: 30,
    unit: "kg",
    quantity: 250,
    location: "Salem",
    imageUrl: "https://images.unsplash.com/photo-1615392865207-9c78058adb35",
    createdAt: new Date("2023-04-03T09:15:00Z"),
    isAvailable: true,
    sellerName: "Prakash Singh",
    sellerInitials: "PS"
  },
  {
    id: 4,
    userId: 1,
    name: "Organic Potatoes",
    description: "Pesticide-free potatoes, great taste and quality.",
    category: "Vegetable",
    price: 20,
    unit: "kg",
    quantity: 150,
    location: "Coimbatore",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
    createdAt: new Date("2023-04-04T11:45:00Z"),
    isAvailable: true,
    sellerName: "Ravi Kumar",
    sellerInitials: "RK"
  },
  {
    id: 5,
    userId: 4,
    name: "Raw Cotton",
    description: "High-quality unprocessed cotton directly from farm.",
    category: "Cash Crop",
    price: 5500,
    unit: "quintal",
    quantity: 10,
    location: "Tirunelveli",
    imageUrl: "https://images.unsplash.com/photo-1569577456919-c3857b48c616",
    createdAt: new Date("2023-04-05T16:20:00Z"),
    isAvailable: true,
    sellerName: "Muthu Lakshmi",
    sellerInitials: "ML"
  },
];

// Mock investment opportunities
export const mockInvestments = [
  {
    id: 1,
    userId: 1,
    title: "Tomato Farm Expansion",
    description: "Seeking investment to expand our successful tomato farm with advanced irrigation systems.",
    cropType: "Tomato",
    investmentPeriod: 6,
    minInvestment: 10000,
    totalShares: 100,
    availableShares: 85,
    expectedReturn: 18,
    farmExperience: 8,
    location: "Coimbatore",
    imageUrl: "https://images.unsplash.com/photo-1592861956120-e524fc739696",
    createdAt: new Date("2023-04-01T10:30:00Z"),
    isActive: true,
    farmerName: "Ravi Kumar",
    farmerInitials: "RK"
  },
  {
    id: 2,
    userId: 2,
    title: "Organic Rice Cultivation",
    description: "Investment opportunity in organic rice farming using traditional methods.",
    cropType: "Rice",
    investmentPeriod: 12,
    minInvestment: 25000,
    totalShares: 50,
    availableShares: 35,
    expectedReturn: 15,
    farmExperience: 12,
    location: "Thanjavur",
    imageUrl: "https://images.unsplash.com/photo-1536632610768-666b52c8a8b2",
    createdAt: new Date("2023-04-02T15:45:00Z"),
    isActive: true,
    farmerName: "Anitha Suresh",
    farmerInitials: "AS"
  },
  {
    id: 3,
    userId: 3,
    title: "Cotton Farming Project",
    description: "Modern cotton farming project using sustainable practices.",
    cropType: "Cotton",
    investmentPeriod: 9,
    minInvestment: 50000,
    totalShares: 25,
    availableShares: 20,
    expectedReturn: 22,
    farmExperience: 15,
    location: "Madurai",
    imageUrl: "https://images.unsplash.com/photo-1602916123107-a39ea5ae3f9c",
    createdAt: new Date("2023-04-03T12:15:00Z"),
    isActive: true,
    farmerName: "Prakash Singh",
    farmerInitials: "PS"
  },
  {
    id: 4,
    userId: 4,
    title: "Vegetable Polyhouse",
    description: "Investment in high-tech polyhouse for year-round vegetable production.",
    cropType: "Mixed Vegetables",
    investmentPeriod: 18,
    minInvestment: 100000,
    totalShares: 10,
    availableShares: 8,
    expectedReturn: 25,
    farmExperience: 7,
    location: "Salem",
    imageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20f6a8343",
    createdAt: new Date("2023-04-04T09:30:00Z"),
    isActive: true,
    farmerName: "Muthu Lakshmi",
    farmerInitials: "ML"
  },
  {
    id: 5,
    userId: 5,
    title: "Onion Farm Collective",
    description: "Community-based farming initiative specializing in onion cultivation.",
    cropType: "Onion",
    investmentPeriod: 8,
    minInvestment: 15000,
    totalShares: 30,
    availableShares: 25,
    expectedReturn: 16,
    farmExperience: 10,
    location: "Erode",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a3ba805c0316",
    createdAt: new Date("2023-04-05T14:00:00Z"),
    isActive: true,
    farmerName: "Senthil Raja",
    farmerInitials: "SR"
  },
];

// Mock user investments
export const mockUserInvestments = [
  {
    id: 1,
    userId: 5,
    investmentId: 1,
    shares: 5,
    amount: 50000,
    status: "Active",
    purchaseDate: new Date("2023-04-15T10:00:00Z")
  },
  {
    id: 2,
    userId: 6,
    investmentId: 2,
    shares: 3,
    amount: 75000,
    status: "Active",
    purchaseDate: new Date("2023-04-16T11:30:00Z")
  },
  {
    id: 3,
    userId: 7,
    investmentId: 3,
    shares: 2,
    amount: 100000,
    status: "Active",
    purchaseDate: new Date("2023-04-17T14:45:00Z")
  },
];

// Helper function to generate price data with realistic progression
function generateCropPriceData(cropName: string, basePrice: number, yearlyIncrease: number) {
  const data = [];
  let id = 1;
  
  for (let year = 2018; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      // Skip future months in 2023
      if (year === 2023 && month > 6) {
        continue;
      }
      
      // Generate realistic price progression
      const yearFactor = 1 + ((year - 2018) * yearlyIncrease / 100);
      const seasonalFactor = 1 + 0.1 * Math.sin(month / 12 * 2 * Math.PI);
      const randomFactor = 0.9 + 0.2 * Math.random();
      
      const price = basePrice * yearFactor * seasonalFactor * randomFactor;
      
      // Rainfall varies by month (higher in monsoon months)
      const rainfall = 10 + 180 * Math.pow(Math.sin((month - 3) / 12 * 2 * Math.PI), 2);
      
      // WPI (Wholesale Price Index) increases gradually
      const wpi = 100 + (year - 2018) * 5 + month * 0.2;
      
      data.push({
        id: id++,
        cropName,
        month,
        year,
        rainfall,
        wpi,
        price
      });
    }
  }
  
  return data;
}