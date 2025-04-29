import React from "react";
import { SuggestedCrop } from "@/types";

interface CropCardProps {
  crop: SuggestedCrop;
}

const CropCard: React.FC<CropCardProps> = ({ crop }) => {
  const getSuitabilityStyle = (suitability: string) => {
    if (suitability.includes("Highly")) {
      return "bg-green-100 text-green-800";
    } else if (suitability.includes("Moderately")) {
      return "bg-amber-100 text-amber-800";
    }
    return "bg-slate-100 text-slate-800";
  };

  return (
    <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-medium text-slate-800">{crop.name}</h4>
          <p className="text-sm text-slate-600">{crop.harvestDays} days to harvest</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getSuitabilityStyle(crop.suitability)}`}>
          {crop.suitability}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Current Price:</span>
          <span className="text-sm font-medium text-slate-800">₹{crop.currentPrice.toFixed(2)}/kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Predicted Price:</span>
          <span className="text-sm font-medium text-green-600">₹{crop.predictedPrice.toFixed(2)}/kg</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Expected Yield:</span>
          <span className="text-sm font-medium text-slate-800">{crop.expectedYield}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Profit Margin:</span>
          <span className="text-sm font-medium text-green-600">+{crop.profitMargin.toFixed(1)}%</span>
        </div>
      </div>
      <button className="w-full px-4 py-2 text-xs font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-md flex items-center justify-center">
        <i className="ri-information-line mr-1"></i>
        View Detailed Cultivation Guide
      </button>
    </div>
  );
};

export default CropCard;
