import React from "react";
import { Crop } from "@/types";

interface MarketActivityProps {
  crops: Crop[];
  isLoading: boolean;
}

const MarketActivity: React.FC<MarketActivityProps> = ({ crops, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-heading font-semibold mb-4">Recent Market Activities</h3>
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-slate-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-heading font-semibold mb-4">Recent Market Activities</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Crop</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price Change</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Rate</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {crops.slice(0, 4).map((crop, index) => (
              <tr key={index}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <i className="ri-plant-line text-primary-500"></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-700">{crop.cropName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-sm font-medium ${crop.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crop.priceChange >= 0 ? '+' : ''}₹{Math.abs(crop.priceChange).toFixed(2)}/{crop.cropName === 'Cotton' ? 'quintal' : 'kg'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-slate-700 text-sm">₹{crop.currentPrice.toFixed(2)}/{crop.cropName === 'Cotton' ? 'quintal' : 'kg'}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-sm flex items-center ${crop.priceChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <i className={`${crop.priceChangePercentage >= 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
                    {Math.abs(crop.priceChangePercentage).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketActivity;
