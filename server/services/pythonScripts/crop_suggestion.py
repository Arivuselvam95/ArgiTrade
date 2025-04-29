#!/usr/bin/env python3

import sys
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Function to read input data
def read_input_data():
    if len(sys.argv) > 1:
        data = json.loads(sys.argv[1])
        return data
    return None

# Function to load crop data
def load_crop_data():
    # In a real application, this would load data from a database
    # For this example, we'll create synthetic data
    crop_data = []
    
    # Define crops with their suitability parameters
    crops = [
        {
            "name": "Tomato",
            "temp_min": 15, "temp_max": 35,
            "rainfall_min": 600, "rainfall_max": 1200,
            "humidity_min": 60, "humidity_max": 80,
            "wind_speed_min": 2, "wind_speed_max": 10,
            "ph_min": 5.5, "ph_max": 7.5,
            "nitrogen": 100, "phosphorus": 80, "potassium": 120,
            "soil_types": ["Red", "Loamy", "Clay", "Black", "Sandy", "Alluvial"],
            "growing_days": 90,
            "expected_yield": "25-30 ton/hectare",
            "profit_margin": 22.1
        },
        {
            "name": "Onion",
            "temp_min": 13, "temp_max": 30,
            "rainfall_min": 500, "rainfall_max": 900,
            "humidity_min": 50, "humidity_max": 70,
            "wind_speed_min": 3, "wind_speed_max": 12,
            "ph_min": 6.0, "ph_max": 7.8,
            "nitrogen": 80, "phosphorus": 60, "potassium": 100,
            "soil_types": ["Red", "Alluvial"],
            "growing_days": 130,
            "expected_yield": "20-25 ton/hectare",
            "profit_margin": 28.5
        },
        {
            "name": "Rice",
            "temp_min": 20, "temp_max": 35,
            "rainfall_min": 1000, "rainfall_max": 2000,
            "humidity_min": 70, "humidity_max": 90,
            "wind_speed_min": 1, "wind_speed_max": 8,
            "ph_min": 5.5, "ph_max": 7.0,
            "nitrogen": 120, "phosphorus": 60, "potassium": 80,
            "soil_types": ["Alluvial", "Clay"],
            "growing_days": 110,
            "expected_yield": "5-7 ton/hectare",
            "profit_margin": -9.9
        },
        {
            "name": "Potato",
            "temp_min": 10, "temp_max": 25,
            "rainfall_min": 500, "rainfall_max": 1000,
            "humidity_min": 60, "humidity_max": 80,
            "wind_speed_min": 2, "wind_speed_max": 8,
            "ph_min": 5.0, "ph_max": 6.5,
            "nitrogen": 90, "phosphorus": 120, "potassium": 150,
            "soil_types": ["Loamy", "Sandy"],
            "growing_days": 100,
            "expected_yield": "20-25 ton/hectare",
            "profit_margin": 18.7
        },
        {
            "name": "Cotton",
            "temp_min": 20, "temp_max": 40,
            "rainfall_min": 600, "rainfall_max": 1200,
            "humidity_min": 50, "humidity_max": 70,
            "wind_speed_min": 3, "wind_speed_max": 15,
            "ph_min": 6.0, "ph_max": 8.0,
            "nitrogen": 60, "phosphorus": 40, "potassium": 80,
            "soil_types": ["Black", "Alluvial"],
            "growing_days": 180,
            "expected_yield": "2-3 ton/hectare",
            "profit_margin": 7.0
        },
        {
            "name": "Green Chili",
            "temp_min": 18, "temp_max": 35,
            "rainfall_min": 600, "rainfall_max": 1200,
            "humidity_min": 65, "humidity_max": 85,
            "wind_speed_min": 2, "wind_speed_max": 10,
            "ph_min": 5.5, "ph_max": 7.0,
            "nitrogen": 110, "phosphorus": 70, "potassium": 130,
            "soil_types": ["Red", "Loamy", "Clay", "Black", "Sandy", "Alluvial"],
            "growing_days": 75,
            "expected_yield": "10-12 ton/hectare",
            "profit_margin": 16.2
        },
        {
            "name": "Brinjal",
            "temp_min": 17, "temp_max": 32,
            "rainfall_min": 600, "rainfall_max": 1000,
            "humidity_min": 60, "humidity_max": 80,
            "wind_speed_min": 2, "wind_speed_max": 10,
            "ph_min": 5.5, "ph_max": 7.5,
            "nitrogen": 100, "phosphorus": 60, "potassium": 120,
            "soil_types": ["Red", "Loamy", "Clay", "Black", "Sandy", "Alluvial"],
            "growing_days": 85,
            "expected_yield": "25-30 ton/hectare",
            "profit_margin": 15.8
        }
    ]
    
    return crops

# Function to check crop suitability
def check_crop_suitability(crop, input_data):
    # Print input data for debugging
    print(f"Debug - Input data: {json.dumps(input_data)}", file=sys.stderr)
    
    # Check temperature suitability with default if not present
    avg_temp = input_data.get("avgTemp", 28)  # Default value
    temp_suitable = crop["temp_min"] <= avg_temp <= crop["temp_max"]
    
    # Check pH suitability
    ph_suitable = crop["ph_min"] <= input_data["phLevel"] <= crop["ph_max"]
    
    # Check soil type suitability
    soil_suitable = input_data["soilType"] in crop["soil_types"]
    
    # Check wind speed suitability with default if not present
    avg_wind_speed = input_data.get("avgWindSpeed", 5)  # Default value
    wind_suitable = crop["wind_speed_min"] <= avg_wind_speed <= crop["wind_speed_max"]
    
    # Check nutrient suitability - use defaults if not provided
    nitrogen = input_data.get("nitrogen", 100)  # Default value
    phosphorus = input_data.get("phosphorus", 70)  # Default value
    potassium = input_data.get("potassium", 90)  # Default value
    
    nitrogen_suitable = abs(crop["nitrogen"] - nitrogen) <= 50
    phosphorus_suitable = abs(crop["phosphorus"] - phosphorus) <= 40
    potassium_suitable = abs(crop["potassium"] - potassium) <= 50
    
    # Calculate overall suitability score (0-3)
    suitability_factors = [
        temp_suitable, ph_suitable, soil_suitable, wind_suitable, 
        nitrogen_suitable, phosphorus_suitable, potassium_suitable
    ]
    
    suitability_score = sum(suitability_factors)
    
    # Determine suitability category
    if suitability_score >= 6:
        return "Highly Suitable"
    elif suitability_score >= 4:
        return "Moderately Suitable"
    else:
        return "Marginally Suitable"

# Function to get crop suggestions
def get_crop_suggestions(input_data):
    # Load crop data
    crops = load_crop_data()
    
    # Check suitability for each crop
    suggestions = []
    for crop in crops:
        suitability = check_crop_suitability(crop, input_data)
        
        # Only include crops that are at least marginally suitable
        if suitability != "Not Suitable":
            suggestions.append({
                "name": crop["name"],
                "suitability": suitability,
                "harvestDays": crop["growing_days"],
                "expectedYield": crop["expected_yield"],
                "profitMargin": crop["profit_margin"]
            })
    
    # Sort suggestions by suitability and profit margin
    sorted_suggestions = sorted(
        suggestions, 
        key=lambda x: (
            0 if x["suitability"] == "Highly Suitable" else (1 if x["suitability"] == "Moderately Suitable" else 2),
            -x["profitMargin"]
        )
    )
    
    return sorted_suggestions[:5]  # Return top 5 suggestions

# Main function
def main():
    try:
        # Get input parameters
        input_data = read_input_data()
        
        if not input_data:
            raise ValueError("No input data provided")
        
        # Get crop suggestions
        suggestions = get_crop_suggestions(input_data)
        
        # Output results as JSON
        result = {
            "suggestedCrops": suggestions
        }
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
