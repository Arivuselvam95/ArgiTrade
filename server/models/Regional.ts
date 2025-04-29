import mongoose, { Document } from 'mongoose';

// Define the interface for Regional data document
interface IRegional extends Document {
  district: string;
  avg_wind_speed: number;
  avg_temp: number;
  weather_patterns: string;
  major_soil_type1: string;
  soil1_ph: number;
  soil1_nitrogen: number;
  soil1_phosphorus: number;
  soil1_potassium: number;
  major_soil_type2?: string;
  soil2_ph?: number;
  soil2_nitrogen?: number;
  soil2_phosphorus?: number;
  soil2_potassium?: number;
}

// Define the schema
const regionalSchema = new mongoose.Schema<IRegional>({
  district: {
    type: String,
    required: true,
    unique: true
  },
  avg_wind_speed: {
    type: Number,
    required: true
  },
  avg_temp: {
    type: Number,
    required: true
  },
  weather_patterns: {
    type: String,
    required: true
  },
  major_soil_type1: {
    type: String,
    required: true
  },
  soil1_ph: {
    type: Number,
    required: true
  },
  soil1_nitrogen: {
    type: Number,
    required: true
  },
  soil1_phosphorus: {
    type: Number,
    required: true
  },
  soil1_potassium: {
    type: Number,
    required: true
  },
  major_soil_type2: {
    type: String,
    required: false
  },
  soil2_ph: {
    type: Number,
    required: false
  },
  soil2_nitrogen: {
    type: Number,
    required: false
  },
  soil2_phosphorus: {
    type: Number,
    required: false
  },
  soil2_potassium: {
    type: Number,
    required: false
  }
});

// Create and export the model
export const Regional = mongoose.model<IRegional>('Regional', regionalSchema);

// Sample data for initialization (would be more comprehensive in a real application)
export const initializeRegionalData = async (): Promise<void> => {
  try {
    const count = await Regional.countDocuments();
    
    if (count === 0) {
      // Sample data for a few districts (complete data would include all districts)
      const regionalData = [
        {
          district: "Coimbatore",
          avg_wind_speed: 8.5,
          avg_temp: 27.8,
          weather_patterns: "Semi-arid",
          major_soil_type1: "Red",
          soil1_ph: 6.5,
          soil1_nitrogen: 140,
          soil1_phosphorus: 12,
          soil1_potassium: 210,
          major_soil_type2: "Black",
          soil2_ph: 7.2,
          soil2_nitrogen: 160,
          soil2_phosphorus: 15,
          soil2_potassium: 250
        },
        {
          district: "Madurai",
          avg_wind_speed: 7.2,
          avg_temp: 29.2,
          weather_patterns: "Tropical",
          major_soil_type1: "Black",
          soil1_ph: 7.8,
          soil1_nitrogen: 130,
          soil1_phosphorus: 10,
          soil1_potassium: 180,
          major_soil_type2: "Red",
          soil2_ph: 6.8,
          soil2_nitrogen: 120,
          soil2_phosphorus: 8,
          soil2_potassium: 160
        },
        {
          district: "Chennai",
          avg_wind_speed: 10.2,
          avg_temp: 30.5,
          weather_patterns: "Coastal",
          major_soil_type1: "Alluvial",
          soil1_ph: 7.2,
          soil1_nitrogen: 150,
          soil1_phosphorus: 12,
          soil1_potassium: 200
        },
        {
          district: "Erode",
          avg_wind_speed: 6.8,
          avg_temp: 28.4,
          weather_patterns: "Semi-arid",
          major_soil_type1: "Red",
          soil1_ph: 6.7,
          soil1_nitrogen: 120,
          soil1_phosphorus: 9,
          soil1_potassium: 170,
          major_soil_type2: "Sandy",
          soil2_ph: 6.3,
          soil2_nitrogen: 100,
          soil2_phosphorus: 7,
          soil2_potassium: 150
        },
        {
          district: "Thanjavur",
          avg_wind_speed: 7.5,
          avg_temp: 28.9,
          weather_patterns: "Tropical",
          major_soil_type1: "Alluvial",
          soil1_ph: 7.6,
          soil1_nitrogen: 190,
          soil1_phosphorus: 15,
          soil1_potassium: 230,
          major_soil_type2: "Clay",
          soil2_ph: 7.9,
          soil2_nitrogen: 170,
          soil2_phosphorus: 13,
          soil2_potassium: 210
        }
      ];
      
      await Regional.insertMany(regionalData);
      console.log('Regional data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing regional data:', error);
  }
};
