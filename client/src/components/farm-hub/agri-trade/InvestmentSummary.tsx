import React from "react";
import { InvestmentSummaryData } from "@/types";

interface InvestmentSummaryProps {
  data: InvestmentSummaryData;
  isLoading: boolean;
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium text-slate-800 text-lg mb-4">Investment Summary</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="h-10 bg-slate-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-slate-800 text-lg mb-4">Investment Summary</h3>
      <div className="space-y-4">
        <div className="p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600">Total Investment</div>
          <div className="text-xl font-semibold text-slate-800">₹{data.totalInvestment.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600">Active Investments</div>
          <div className="text-xl font-semibold text-slate-800">{data.activeInvestments}</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600">Current Returns</div>
          <div className="text-xl font-semibold text-green-600">+₹{data.currentReturns.toLocaleString()} ({data.returnPercentage.toFixed(1)}%)</div>
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Create New Investment
        </button>
      </div>
    </div>
  );
};

export default InvestmentSummary;
