import React, { useState } from "react";
import { Crop } from "@/types";

interface PredictionTableProps {
  crops: Crop[];
  isLoading: boolean;
}

const PredictionTable: React.FC<PredictionTableProps> = ({ crops, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPeriod, setSelectedPeriod] = useState("Next Financial Year");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Filter crops by category
  const filteredCrops = selectedCategory === "All Categories" 
    ? crops 
    : crops.filter(crop => crop.category === selectedCategory);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage);
  const paginatedCrops = filteredCrops.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-xl font-heading font-semibold mb-4">Crop Price Predictions</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <p className="text-slate-600 mb-2 md:mb-0">
              Based on historical data and market trends
            </p>
            <div className="flex space-x-2">
              <div className="relative">
                <select 
                  className="pl-3 pr-10 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled
                >
                  <option>All Categories</option>
                </select>
              </div>
              <div className="relative">
                <select 
                  className="pl-3 pr-10 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  disabled
                >
                  <option>Next Financial Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-10 bg-slate-200 w-full"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-slate-100 w-full border-t border-slate-200"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-4">Crop Price Predictions</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <p className="text-slate-600 mb-2 md:mb-0">
            Based on historical data and market trends
          </p>
          <div className="flex space-x-2">
            <div className="relative">
              <select 
                className="pl-3 pr-10 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Vegetable</option>
                <option>Fruit</option>
                <option>Grain</option>
                <option>Cash Crop</option>
              </select>
            </div>
            <div className="relative">
              <select 
                className="pl-3 pr-10 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option>Next Financial Year</option>
                <option>Next 6 Months</option>
                <option>Next 3 Months</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Predicted Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {paginatedCrops.map((crop, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <i className="ri-plant-line text-primary-500"></i>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{crop.cropName}</div>
                      <div className="text-sm text-slate-500">{crop.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">₹{crop.currentPrice.toFixed(2)}/{crop.cropName === 'Cotton' ? 'quintal' : 'kg'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">₹{crop.predictedPrice.toFixed(2)}/{crop.cropName === 'Cotton' ? 'quintal' : 'kg'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${crop.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crop.priceChange >= 0 ? '+' : ''}₹{Math.abs(crop.priceChange).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    crop.priceChangePercentage >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <i className={`${crop.priceChangePercentage >= 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
                    {Math.abs(crop.priceChangePercentage).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 sm:px-6">
        <div className="flex items-center justify-between flex-column flex-wrap sm:flex-row">
          <div className="flex-shrink-0">
            <p className="text-sm text-slate-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredCrops.length)}
              </span> of <span className="font-medium">{filteredCrops.length}</span> results
            </p>
          </div>
          <div className="mt-2 sm:mt-0">
            <nav className="flex justify-center sm:justify-end">
              <button 
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <i className="ri-arrow-left-s-line"></i>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button 
                  key={index}
                  className={`relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium ${
                    currentPage === index + 1 
                      ? 'text-primary-600' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
