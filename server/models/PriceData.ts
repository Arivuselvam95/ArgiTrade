import mongoose, { Document } from 'mongoose';

// Define the interface for Price data document
interface IPriceData extends Document {
  crop_name: string;
  month: number;
  year: number;
  rainfall: number;
  wpi: number;
  price: number;
}

// Define the schema
const priceDataSchema = new mongoose.Schema<IPriceData>({
  crop_name: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rainfall: {
    type: Number,
    required: true
  },
  wpi: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create a compound index for crop_name, month, and year
priceDataSchema.index({ crop_name: 1, month: 1, year: 1 }, { unique: true });

// Create and export the model
export const PriceData = mongoose.model<IPriceData>('PriceData', priceDataSchema);

// Sample data for initialization
export const initializePriceData = async (): Promise<void> => {
  try {
    const count = await PriceData.countDocuments();
    
    if (count === 0) {
      // Sample price data for demonstration purposes
      const priceData = [
        // Tomato price data (2021-2023)
        { crop_name: "Tomato", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 65.00 },
        { crop_name: "Tomato", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 70.50 },
        { crop_name: "Tomato", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 75.20 },
        { crop_name: "Tomato", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 78.80 },
        { crop_name: "Tomato", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 82.50 },
        { crop_name: "Tomato", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 85.00 },
        
        // Onion price data (2021-2023)
        { crop_name: "Onion", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 42.30 },
        { crop_name: "Onion", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 45.80 },
        { crop_name: "Onion", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 50.20 },
        { crop_name: "Onion", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 55.60 },
        { crop_name: "Onion", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 60.10 },
        { crop_name: "Onion", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 65.25 },
        
        // Rice price data (2021-2023)
        { crop_name: "Rice", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 35.20 },
        { crop_name: "Rice", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 37.50 },
        { crop_name: "Rice", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 39.80 },
        { crop_name: "Rice", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 41.20 },
        { crop_name: "Rice", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 42.10 },
        { crop_name: "Rice", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 42.75 },
        
        // Potato price data (2021-2023)
        { crop_name: "Potato", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 20.10 },
        { crop_name: "Potato", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 22.30 },
        { crop_name: "Potato", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 24.50 },
        { crop_name: "Potato", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 26.20 },
        { crop_name: "Potato", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 27.40 },
        { crop_name: "Potato", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 28.50 },
        
        // Cotton price data (2021-2023) (per quintal)
        { crop_name: "Cotton", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 5420.00 },
        { crop_name: "Cotton", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 5650.00 },
        { crop_name: "Cotton", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 5780.00 },
        { crop_name: "Cotton", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 5920.00 },
        { crop_name: "Cotton", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 6050.00 },
        { crop_name: "Cotton", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 6245.00 },
        
        // Green Chili price data (2021-2023)
        { crop_name: "Green Chili", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 75.20 },
        { crop_name: "Green Chili", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 80.10 },
        { crop_name: "Green Chili", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 85.30 },
        { crop_name: "Green Chili", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 88.40 },
        { crop_name: "Green Chili", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 92.20 },
        { crop_name: "Green Chili", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 95.50 },
        
        // Brinjal price data (2021-2023)
        { crop_name: "Brinjal", month: 1, year: 2021, rainfall: 18.2, wpi: 113.4, price: 32.10 },
        { crop_name: "Brinjal", month: 6, year: 2021, rainfall: 167.3, wpi: 115.2, price: 34.50 },
        { crop_name: "Brinjal", month: 12, year: 2021, rainfall: 8.5, wpi: 117.8, price: 36.80 },
        { crop_name: "Brinjal", month: 6, year: 2022, rainfall: 182.1, wpi: 120.3, price: 38.20 },
        { crop_name: "Brinjal", month: 12, year: 2022, rainfall: 10.2, wpi: 122.6, price: 40.10 },
        { crop_name: "Brinjal", month: 6, year: 2023, rainfall: 190.5, wpi: 125.1, price: 42.00 }
      ];
      
      await PriceData.insertMany(priceData);
      console.log('Price data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing price data:', error);
  }
};
