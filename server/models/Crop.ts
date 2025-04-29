import mongoose, { Document } from 'mongoose';

// Define the interface for Crop data document
interface ICrop extends Document {
  crop_name: string;
  temp_min: number;
  temp_max: number;
  rainfall_min: number;
  rainfall_max: number;
  humidity_min: number;
  humidity_max: number;
  wind_speed_min: number;
  wind_speed_max: number;
  ph_min: number;
  ph_max: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  soil_type_encoded: number;
  region_encoded: number;
  season_encoded: number;
  growing_days: number;
  expected_yield: string;
  category: string;
}

// Define the schema
const cropSchema = new mongoose.Schema<ICrop>({
  crop_name: {
    type: String,
    required: true,
    unique: true
  },
  temp_min: {
    type: Number,
    required: true
  },
  temp_max: {
    type: Number,
    required: true
  },
  rainfall_min: {
    type: Number,
    required: true
  },
  rainfall_max: {
    type: Number,
    required: true
  },
  humidity_min: {
    type: Number,
    required: true
  },
  humidity_max: {
    type: Number,
    required: true
  },
  wind_speed_min: {
    type: Number,
    required: true
  },
  wind_speed_max: {
    type: Number,
    required: true
  },
  ph_min: {
    type: Number,
    required: true
  },
  ph_max: {
    type: Number,
    required: true
  },
  nitrogen: {
    type: Number,
    required: true
  },
  phosphorus: {
    type: Number,
    required: true
  },
  potassium: {
    type: Number,
    required: true
  },
  soil_type_encoded: {
    type: Number,
    required: true
  },
  region_encoded: {
    type: Number,
    required: true
  },
  season_encoded: {
    type: Number,
    required: true
  },
  growing_days: {
    type: Number,
    required: true
  },
  expected_yield: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

// Create and export the model
export const Crop = mongoose.model<ICrop>('Crop', cropSchema);

// Sample data for initialization
export const initializeCropData = async (): Promise<void> => {
  try {
    const count = await Crop.countDocuments();
    
    if (count === 0) {
      // Sample data for common crops
      const cropData = [
        {
          crop_name: "Tomato",
          temp_min: 15,
          temp_max: 35,
          rainfall_min: 600,
          rainfall_max: 1200,
          humidity_min: 60,
          humidity_max: 80,
          wind_speed_min: 2,
          wind_speed_max: 10,
          ph_min: 5.5,
          ph_max: 7.5,
          nitrogen: 100,
          phosphorus: 80,
          potassium: 120,
          soil_type_encoded: 2, // 2 for Red soil (1: Black, 2: Red, 3: Alluvial, 4: Sandy, 5: Clay, 6: Loamy)
          region_encoded: 1, // 1 for South India
          season_encoded: 2, // 2 for Summer
          growing_days: 90,
          expected_yield: "25-30 ton/hectare",
          category: "Vegetable"
        },
        {
          crop_name: "Onion",
          temp_min: 13,
          temp_max: 30,
          rainfall_min: 500,
          rainfall_max: 900,
          humidity_min: 50,
          humidity_max: 70,
          wind_speed_min: 3,
          wind_speed_max: 12,
          ph_min: 6.0,
          ph_max: 7.8,
          nitrogen: 80,
          phosphorus: 60,
          potassium: 100,
          soil_type_encoded: 2,
          region_encoded: 1,
          season_encoded: 2,
          growing_days: 130,
          expected_yield: "20-25 ton/hectare",
          category: "Vegetable"
        },
        {
          crop_name: "Rice",
          temp_min: 20,
          temp_max: 35,
          rainfall_min: 1000,
          rainfall_max: 2000,
          humidity_min: 70,
          humidity_max: 90,
          wind_speed_min: 1,
          wind_speed_max: 8,
          ph_min: 5.5,
          ph_max: 7.0,
          nitrogen: 120,
          phosphorus: 60,
          potassium: 80,
          soil_type_encoded: 3,
          region_encoded: 1,
          season_encoded: 3, // 3 for Monsoon
          growing_days: 110,
          expected_yield: "5-7 ton/hectare",
          category: "Grain"
        },
        {
          crop_name: "Potato",
          temp_min: 10,
          temp_max: 25,
          rainfall_min: 500,
          rainfall_max: 1000,
          humidity_min: 60,
          humidity_max: 80,
          wind_speed_min: 2,
          wind_speed_max: 8,
          ph_min: 5.0,
          ph_max: 6.5,
          nitrogen: 90,
          phosphorus: 120,
          potassium: 150,
          soil_type_encoded: 6,
          region_encoded: 1,
          season_encoded: 1, // 1 for Winter
          growing_days: 100,
          expected_yield: "20-25 ton/hectare",
          category: "Vegetable"
        },
        {
          crop_name: "Cotton",
          temp_min: 20,
          temp_max: 40,
          rainfall_min: 600,
          rainfall_max: 1200,
          humidity_min: 50,
          humidity_max: 70,
          wind_speed_min: 3,
          wind_speed_max: 15,
          ph_min: 6.0,
          ph_max: 8.0,
          nitrogen: 60,
          phosphorus: 40,
          potassium: 80,
          soil_type_encoded: 1,
          region_encoded: 1,
          season_encoded: 3,
          growing_days: 180,
          expected_yield: "2-3 ton/hectare",
          category: "Cash Crop"
        },
        {
          crop_name: "Green Chili",
          temp_min: 18,
          temp_max: 35,
          rainfall_min: 600,
          rainfall_max: 1200,
          humidity_min: 65,
          humidity_max: 85,
          wind_speed_min: 2,
          wind_speed_max: 10,
          ph_min: 5.5,
          ph_max: 7.0,
          nitrogen: 110,
          phosphorus: 70,
          potassium: 130,
          soil_type_encoded: 2,
          region_encoded: 1,
          season_encoded: 2,
          growing_days: 75,
          expected_yield: "10-12 ton/hectare",
          category: "Vegetable"
        },
        {
          crop_name: "Brinjal",
          temp_min: 17,
          temp_max: 32,
          rainfall_min: 600,
          rainfall_max: 1000,
          humidity_min: 60,
          humidity_max: 80,
          wind_speed_min: 2,
          wind_speed_max: 10,
          ph_min: 5.5,
          ph_max: 7.5,
          nitrogen: 100,
          phosphorus: 60,
          potassium: 120,
          soil_type_encoded: 2,
          region_encoded: 1,
          season_encoded: 2,
          growing_days: 85,
          expected_yield: "25-30 ton/hectare",
          category: "Vegetable"
        }
      ];
      
      await Crop.insertMany(cropData);
      console.log('Crop data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing crop data:', error);
  }
};
