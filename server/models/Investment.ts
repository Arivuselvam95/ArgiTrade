import mongoose, { Document } from 'mongoose';

// Define the interface for Investment document
interface IInvestment extends Document {
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
  createdAt: Date;
  isActive: boolean;
  farmerName?: string;
  farmerInitials?: string;
}

// Define the schema
const investmentSchema = new mongoose.Schema<IInvestment>({
  userId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cropType: {
    type: String,
    required: true
  },
  investmentPeriod: {
    type: Number,
    required: true
  },
  minInvestment: {
    type: Number,
    required: true
  },
  totalShares: {
    type: Number,
    required: true
  },
  availableShares: {
    type: Number,
    required: true
  },
  expectedReturn: {
    type: Number,
    required: true
  },
  farmExperience: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  farmerName: {
    type: String,
    required: false
  },
  farmerInitials: {
    type: String,
    required: false
  }
});

// Create and export the model
export const Investment = mongoose.model<IInvestment>('Investment', investmentSchema);

// Sample data for initialization
export const initializeInvestments = async (): Promise<void> => {
  try {
    const count = await Investment.countDocuments();
    
    if (count === 0) {
      // Sample investments for agri-trade
      const investments = [
        {
          userId: 1,
          title: "Premium Tomato Farm Share",
          description: "Invest in our premium tomato farm in Coimbatore. We have a strong track record of growing top-quality tomatoes for both local and export markets. This season, we expect even higher demand due to increased exports.",
          cropType: "Tomato",
          investmentPeriod: 4,
          minInvestment: 10000,
          totalShares: 100,
          availableShares: 65,
          expectedReturn: 22.1,
          farmExperience: 15,
          location: "Coimbatore",
          imageUrl: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isActive: true,
          farmerName: "Ramesh Sundar",
          farmerInitials: "RS"
        },
        {
          userId: 2,
          title: "Organic Onion Cultivation",
          description: "Join our successful organic onion farming venture in Erode. We specialize in red onions that command premium prices in the market. With our sustainable farming practices, we consistently produce high-quality harvests.",
          cropType: "Onion",
          investmentPeriod: 5,
          minInvestment: 15000,
          totalShares: 100,
          availableShares: 40,
          expectedReturn: 28.5,
          farmExperience: 8,
          location: "Erode",
          imageUrl: "https://images.unsplash.com/photo-1533062618053-d51e617307ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isActive: true,
          farmerName: "Vimal Murugan",
          farmerInitials: "VM"
        },
        {
          userId: 4,
          title: "Premium Green Chili Farm",
          description: "Invest in our specialized green chili farm in Madurai. We grow premium varieties that are in high demand in both local and export markets. With controlled growing conditions, we maximize yield and quality.",
          cropType: "Green Chili",
          investmentPeriod: 3,
          minInvestment: 8000,
          totalShares: 100,
          availableShares: 75,
          expectedReturn: 16.2,
          farmExperience: 12,
          location: "Madurai",
          imageUrl: "https://images.unsplash.com/photo-1592982537447-7440770faae9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isActive: true,
          farmerName: "Lakshmi Rajendran",
          farmerInitials: "LR"
        }
      ];
      
      await Investment.insertMany(investments);
      console.log('Investments initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing investments:', error);
  }
};
