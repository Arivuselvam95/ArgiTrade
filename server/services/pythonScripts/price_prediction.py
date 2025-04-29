#!/usr/bin/env python3

import sys
import json
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Function to read input data
def read_input_data():
    if len(sys.argv) > 1:
        data = json.loads(sys.argv[1])
        return data
    return None

# Mock function to load historical price data
# In a real application, this would load data from a database
def load_historical_data():
    # Example data structure (this would be loaded from MongoDB in a real app)
    data = []
    
    # Tomato price data (2018-2023)
    for year in range(2018, 2024):
        for month in range(1, 13):
            # Skip future months in 2023
            if year == 2023 and month > 6:
                continue
            
            # Generate realistic price progression
            base_price = 50 + (year - 2018) * 5  # Base price increases yearly
            seasonal_factor = 1 + 0.1 * np.sin(month / 12 * 2 * np.pi)  # Seasonal variation
            random_factor = 0.9 + 0.2 * np.random.random()  # Random variation
            
            price = base_price * seasonal_factor * random_factor
            
            # Rainfall varies by month (higher in monsoon months)
            rainfall = 10 + 180 * np.sin((month - 3) / 12 * 2 * np.pi) ** 2
            if rainfall < 0:
                rainfall = 5
            
            # WPI (Wholesale Price Index) increases gradually
            wpi = 100 + (year - 2018) * 5 + month * 0.2
            
            data.append({
                "crop_name": "Tomato",
                "month": month,
                "year": year,
                "rainfall": rainfall,
                "wpi": wpi,
                "price": price
            })
    
    # Add data for other crops (simplified)
    crops = ["Onion", "Rice", "Potato", "Cotton", "Green Chili", "Brinjal"]
    base_prices = [40, 35, 20, 5000, 70, 30]
    
    for crop_idx, crop_name in enumerate(crops):
        base_price = base_prices[crop_idx]
        for year in range(2018, 2024):
            for month in range(1, 13):
                # Skip future months in 2023
                if year == 2023 and month > 6:
                    continue
                
                # Customize growth rates for different crops
                growth_factor = 1 + (year - 2018) * (0.02 + 0.02 * np.random.random())
                seasonal_factor = 1 + 0.15 * np.sin((month + crop_idx) / 12 * 2 * np.pi)
                random_factor = 0.95 + 0.1 * np.random.random()
                
                price = base_price * growth_factor * seasonal_factor * random_factor
                
                # Cotton prices are much higher (per quintal)
                if crop_name == "Cotton":
                    price = price * 100
                
                # Rainfall varies by month (higher in monsoon months)
                rainfall = 10 + 180 * np.sin((month - 3) / 12 * 2 * np.pi) ** 2
                if rainfall < 0:
                    rainfall = 5
                
                # WPI (Wholesale Price Index) increases gradually
                wpi = 100 + (year - 2018) * 5 + month * 0.2
                
                data.append({
                    "crop_name": crop_name,
                    "month": month,
                    "year": year,
                    "rainfall": rainfall,
                    "wpi": wpi,
                    "price": price
                })
    
    return pd.DataFrame(data)

# Function to predict crop prices
def predict_crop_prices(df, predict_months=12):
    results = []
    
    # Get unique crops
    crops = df['crop_name'].unique()
    
    for crop in crops:
        # Filter data for the current crop
        crop_data = df[df['crop_name'] == crop].copy()
        
        # Prepare features and target
        X = crop_data[['month', 'year', 'rainfall', 'wpi']]
        y = crop_data['price']
        
        # Train a Random Forest model
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Get latest data point for this crop
        latest_data = crop_data.iloc[-1]
        latest_year = latest_data['year']
        latest_month = latest_data['month']
        latest_price = latest_data['price']
        
        # Predict future prices
        future_data = []
        for i in range(1, predict_months + 1):
            future_month = (latest_month + i) % 12
            if future_month == 0:
                future_month = 12
            future_year = latest_year + (latest_month + i - 1) // 12
            
            # Estimate rainfall and WPI for future
            future_rainfall = 10 + 180 * np.sin((future_month - 3) / 12 * 2 * np.pi) ** 2
            if future_rainfall < 0:
                future_rainfall = 5
            
            future_wpi = latest_data['wpi'] + (future_year - latest_year) * 5 + (future_month - latest_month) * 0.2
            
            future_data.append([future_month, future_year, future_rainfall, future_wpi])
        
        # Make predictions
        future_df = pd.DataFrame(future_data, columns=['month', 'year', 'rainfall', 'wpi'])
        predictions = model.predict(future_df)
        
        # Calculate the predicted price for the next financial year
        next_year_prediction = np.mean(predictions)
        
        # Calculate price change
        price_change = next_year_prediction - latest_price
        price_change_percentage = (price_change / latest_price) * 100
        
        # Determine crop category
        category = "Other"
        if crop in ["Tomato", "Onion", "Potato", "Green Chili", "Brinjal", "Carrot"]:
            category = "Vegetable"
        elif crop in ["Apple", "Banana", "Orange", "Mango"]:
            category = "Fruit"
        elif crop in ["Rice", "Wheat", "Millet"]:
            category = "Grain"
        elif crop in ["Cotton", "Sugarcane", "Coffee"]:
            category = "Cash Crop"
        
        # Determine demand based on price change percentage
        demand = "Low Demand"
        if price_change_percentage > 15:
            demand = "High Demand"
        elif price_change_percentage > 5:
            demand = "Medium Demand"
        
        # Add result
        results.append({
            "cropName": crop,
            "currentPrice": round(latest_price, 2),
            "predictedPrice": round(next_year_prediction, 2),
            "priceChange": round(price_change, 2),
            "priceChangePercentage": round(price_change_percentage, 2),
            "category": category,
            "demand": demand
        })
    
    # Sort results by price change percentage (profitability)
    sorted_by_profit = sorted(results, key=lambda x: x['priceChangePercentage'], reverse=True)
    
    # Sort by demand
    sorted_by_demand = sorted(results, key=lambda x: (
        0 if x['demand'] == "High Demand" else (1 if x['demand'] == "Medium Demand" else 2),
        -x['priceChangePercentage']
    ))
    
    return {
        "profitableCrops": sorted_by_profit[:5],
        "demandableCrops": sorted_by_demand[:5],
        "allCrops": results
    }

# Main function
def main():
    try:
        # Get input parameters
        input_data = read_input_data()
        
        # Load historical price data
        historical_data = load_historical_data()
        
        # Predict crop prices
        predictions = predict_crop_prices(historical_data)
        
        # Output results as JSON
        print(json.dumps(predictions))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
