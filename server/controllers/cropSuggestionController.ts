import { Request, Response } from 'express';
import { z } from 'zod';
import { cropSuggestionFormSchema } from '../../shared/schema';
import { District } from '../models/District';
import { Regional } from '../models/Regional';
import { PriceData } from '../models/PriceData';
import { spawn } from 'child_process';
import path from 'path';

export const getDistricts = async (req: Request, res: Response) => {
  try {
    // Get Tamil Nadu districts data
    const districts = await District.find().lean();
    res.json(districts);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ message: 'Error fetching districts data' });
  }
};

export const getRegionalData = async (req: Request, res: Response) => {
  try {
    const { district } = req.params;
    
    const regionalData = await Regional.findOne({ district }).lean();
    
    if (!regionalData) {
      return res.status(404).json({ message: 'District data not found' });
    }
    
    res.json(regionalData);
  } catch (error) {
    console.error('Error fetching regional data:', error);
    res.status(500).json({ message: 'Error fetching regional data' });
  }
};

export const submitCropSuggestion = async (req: Request, res: Response) => {
  try {
    // Validate input data
    const validatedData = cropSuggestionFormSchema.parse(req.body);
    
    // Get regional data for the district
    const regionalData = await Regional.findOne({ district: validatedData.district }).lean();
    
    if (!regionalData) {
      return res.status(404).json({ message: 'District data not found' });
    }
    
    // Run Python script for crop suggestion
    const scriptPath = path.join(__dirname, '../services/pythonScripts/crop_suggestion.py');
    
    // Combine form data with regional data for analysis
    const analysisData = {
      ...validatedData,
      avgWindSpeed: regionalData.avg_wind_speed,
      avgTemp: regionalData.avg_temp,
      weatherPatterns: regionalData.weather_patterns,
    };
    
    const process = spawn('python', [scriptPath, JSON.stringify(analysisData)]);
    
    let dataString = '';
    
    process.stdout.on('data', (data) => {
      dataString += data.toString();
    });
    
    process.stderr.on('data', (data) => {
      console.error(`Python script stderr: ${data}`);
    });
    
    process.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Error running crop suggestion model' });
      }
      
      try {
        const results = JSON.parse(dataString);
        
        // Fetch additional data for each suggested crop
        Promise.all(results.suggestedCrops.map(async (crop: any) => {
          const priceData = await PriceData.findOne({ crop_name: crop.name }).lean();
          crop.currentPrice = priceData?.price || 0;
          crop.predictedPrice = priceData?.price * (1 + (crop.profitMargin / 100)) || 0;
          return crop;
        }))
        .then(completedCrops => {
          res.json({
            district: validatedData.district,
            soilType: validatedData.soilType,
            phLevel: validatedData.phLevel,
            suggestedCrops: completedCrops
          });
        });
      } catch (error) {
        console.error('Error parsing Python script output:', error);
        res.status(500).json({ message: 'Error processing crop suggestion results' });
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    console.error('Error running crop suggestion:', error);
    res.status(500).json({ message: 'Server error running crop suggestion' });
  }
};
