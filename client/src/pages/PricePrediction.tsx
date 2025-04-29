import { useState } from "react";
import usePricePrediction from "@/hooks/usePricePrediction";
import ProfitableCrops from "@/components/price-prediction/ProfitableCrops";
import DemandableCrops from "@/components/price-prediction/DemandableCrops";
import PredictionTable from "@/components/price-prediction/PredictionTable";

const PricePrediction = () => {
  const { 
    pricePredictionData,
    isLoading,
    error
  } = usePricePrediction();

  if (error) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>Error loading price prediction data: {error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-800">Crop Price Prediction</h2>
        <p className="text-slate-600 mt-1">Analyze historical data to predict crop prices and plan for better profits</p>
      </div>

      {/* Most Profitable & Demandable Crops */}
      <div className="mb-8">
        <h3 className="text-xl font-heading font-semibold mb-4">Most Demandable & Profitable Crops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfitableCrops 
            crops={pricePredictionData?.profitableCrops || []}
            isLoading={isLoading}
          />

          <DemandableCrops 
            crops={pricePredictionData?.demandableCrops || []}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Price Prediction Table */}
      <PredictionTable 
        crops={pricePredictionData?.allCrops || []}
        isLoading={isLoading}
      />
    </main>
  );
};

export default PricePrediction;
