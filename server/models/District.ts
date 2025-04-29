import mongoose, { Document } from 'mongoose';

// Define the interface for District document
interface IDistrict extends Document {
  id: number;
  name: string;
}

// Define the schema
const districtSchema = new mongoose.Schema<IDistrict>({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Create and export the model
export const District = mongoose.model<IDistrict>('District', districtSchema);

// Initialize with Tamil Nadu districts if they don't exist
export const initializeDistricts = async (): Promise<void> => {
  try {
    const count = await District.countDocuments();
    
    if (count === 0) {
      const tamilNaduDistricts = [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
        "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Karur", 
        "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", 
        "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", 
        "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", 
        "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
        "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
      ];
      
      const districts = tamilNaduDistricts.map((name, index) => ({
        id: index + 1,
        name
      }));
      
      await District.insertMany(districts);
      console.log('Tamil Nadu districts initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing districts:', error);
  }
};
