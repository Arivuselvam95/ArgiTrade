import mongoose, { Document } from 'mongoose';

// Define the interface for Product document
interface IProduct extends Document {
  userId: number;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  location: string;
  locationCoordinates?: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  createdAt: Date;
  isAvailable: boolean;
  sellerName?: string;
  sellerInitials?: string;
}

// Define the schema
const productSchema = new mongoose.Schema<IProduct>({
  userId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  locationCoordinates: {
    type: {
      lat: Number,
      lng: Number
    },
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  sellerName: {
    type: String,
    required: false
  },
  sellerInitials: {
    type: String,
    required: false
  }
});

// Create and export the model
export const Product = mongoose.model<IProduct>('Product', productSchema);

// Sample data for initialization
export const initializeProducts = async (): Promise<void> => {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      // Sample products for marketplace
      const products = [
        {
          userId: 1,
          name: "Fresh Tomatoes",
          description: "Farm-fresh tomatoes, harvested today. Available in bulk.",
          category: "Vegetables",
          price: 85.00,
          unit: "kg",
          quantity: 250,
          location: "Coimbatore",
          locationCoordinates: {
            lat: 11.0168,
            lng: 76.9558
          },
          imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Ramesh S.",
          sellerInitials: "RS"
        },
        {
          userId: 2,
          name: "Organic Onions",
          description: "Organically grown red onions. No pesticides used.",
          category: "Vegetables",
          price: 65.00,
          unit: "kg",
          quantity: 300,
          location: "Erode",
          locationCoordinates: {
            lat: 11.3410,
            lng: 77.7172
          },
          imageUrl: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Vimal M.",
          sellerInitials: "VM"
        },
        {
          userId: 3,
          name: "Premium Rice",
          description: "High-quality rice, perfect for daily consumption. Min order: 25kg.",
          category: "Grains",
          price: 42.00,
          unit: "kg",
          quantity: 500,
          location: "Thanjavur",
          locationCoordinates: {
            lat: 10.7870,
            lng: 79.1378
          },
          imageUrl: "https://images.unsplash.com/photo-1555447740-02a421e77a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Sunil K.",
          sellerInitials: "SK"
        },
        {
          userId: 4,
          name: "Green Chillies",
          description: "Freshly harvested green chillies. Medium spice level.",
          category: "Vegetables",
          price: 95.00,
          unit: "kg",
          quantity: 100,
          location: "Madurai",
          locationCoordinates: {
            lat: 9.9252,
            lng: 78.1198
          },
          imageUrl: "https://images.unsplash.com/photo-1510400655-5af6cca3c40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Lakshmi R.",
          sellerInitials: "LR"
        },
        {
          userId: 5,
          name: "Organic Potatoes",
          description: "Organically grown potatoes. Great for cooking.",
          category: "Vegetables",
          price: 28.00,
          unit: "kg",
          quantity: 400,
          location: "Salem",
          locationCoordinates: {
            lat: 11.6643,
            lng: 78.1460
          },
          imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Anand P.",
          sellerInitials: "AP"
        },
        {
          userId: 6,
          name: "Fresh Carrots",
          description: "Freshly harvested carrots. Sweet and crunchy.",
          category: "Vegetables",
          price: 35.00,
          unit: "kg",
          quantity: 200,
          location: "Coimbatore",
          locationCoordinates: {
            lat: 11.0168,
            lng: 76.9558
          },
          imageUrl: "https://images.unsplash.com/photo-1597800235077-f413b293a2b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          isAvailable: true,
          sellerName: "Rajesh M.",
          sellerInitials: "RM"
        }
      ];
      
      await Product.insertMany(products);
      console.log('Products initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
  }
};
