import React from "react";
import { Investment } from "@/types";
import { Button } from "@/components/ui/button";

interface InvestmentCardProps {
  investment: Investment;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  // Use a default image URL for now since we can't include actual images
  const defaultImageUrl = "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="md:w-1/4">
          <div className="h-40 md:h-full bg-slate-100 rounded-lg overflow-hidden">
            <div
              className="w-full h-full object-cover"
              style={{ backgroundImage: `url(${investment.imageUrl || defaultImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
          </div>
        </div>
        <div className="md:w-3/4 md:pl-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-medium text-slate-800">{investment.title}</h4>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <i className="ri-line-chart-line mr-0.5"></i>
              Expected Return: {investment.expectedReturn}%
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            {investment.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            <div className="p-2 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500">Investment Period</div>
              <div className="text-sm font-medium text-slate-800">{investment.investmentPeriod} months</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500">Min. Investment</div>
              <div className="text-sm font-medium text-slate-800">₹{investment.minInvestment.toLocaleString()}</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500">Available Shares</div>
              <div className="text-sm font-medium text-slate-800">
                {Math.floor((investment.availableShares / investment.totalShares) * 100)}%
              </div>
            </div>
            <div className="p-2 bg-slate-50 rounded-md">
              <div className="text-xs text-slate-500">Farm Experience</div>
              <div className="text-sm font-medium text-slate-800">{investment.farmExperience}+ years</div>
            </div>
          </div>
          <div className="mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs">
                {investment.farmerInitials}
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium text-slate-700">{investment.farmerName}</div>
                <div className="text-xs text-slate-500">Verified Farmer</div>
              </div>
            </div>
            <Button
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View Investment Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
