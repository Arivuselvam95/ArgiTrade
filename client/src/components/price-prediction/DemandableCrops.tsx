import React from "react";
import { Crop } from "@/types";

interface DemandableCropsProps {
  crops: Crop[];
  isLoading: boolean;
}

const DemandableCrops: React.FC<DemandableCropsProps> = ({ crops, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <span className="p-2 rounded-full bg-amber-100 text-amber-600">
            <i className="ri-shopping-bag-line text-xl"></i>
          </span>
          <h4 className="ml-2 text-lg font-medium">Most Demandable Crops</h4>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex items-center justify-between p-3 bg-slate-50 rounded-md">
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <span className="p-2 rounded-full bg-amber-100 text-amber-600">
          <i className="ri-shopping-bag-line text-xl"></i>
        </span>
        <h4 className="ml-2 text-lg font-medium">Most Demandable Crops</h4>
      </div>
      <div className="space-y-4">
        {crops.map((crop, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
            <div className="flex items-center">
              <span className="font-medium text-slate-800">{crop.cropName}</span>
            </div>
            <div className="text-right">
              <span className="text-amber-600 font-medium">{crop.demand}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandableCrops;
