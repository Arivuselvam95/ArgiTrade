import React, { useState } from "react";
import { Investment } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InvestmentCard from "./InvestmentCard";
import {Pagination} from "@/components/ui/pagination";

interface InvestmentListProps {
  investments: Investment[];
  isLoading: boolean;
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Returns");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Filter investments by search term
  const filteredInvestments = investments.filter(investment => 
    investment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    investment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investment.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort investments
  const sortedInvestments = [...filteredInvestments].sort((a, b) => {
    switch (sortBy) {
      case "Returns":
        return b.expectedReturn - a.expectedReturn;
      case "Duration: Short to Long":
        return a.investmentPeriod - b.investmentPeriod;
      case "Duration: Long to Short":
        return b.investmentPeriod - a.investmentPeriod;
      case "Investment: Low to High":
        return a.minInvestment - b.minInvestment;
      default:
        return b.expectedReturn - a.expectedReturn;
    }
  });
  
  // Paginate investments
  const totalPages = Math.ceil(sortedInvestments.length / itemsPerPage);
  const paginatedInvestments = sortedInvestments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h3 className="font-medium text-slate-800 text-lg">Available Investment Opportunities</h3>
          <div className="flex space-x-2">
            <div className="relative w-40">
              <div className="h-10 bg-slate-200 rounded-md animate-pulse"></div>
            </div>
            <div className="relative w-48">
              <div className="h-10 bg-slate-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-slate-200 rounded-lg overflow-hidden p-4">
              <div className="animate-pulse space-y-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                  <div className="md:w-1/4">
                    <div className="h-40 md:h-full bg-slate-200 rounded-lg"></div>
                  </div>
                  <div className="md:w-3/4 md:pl-4 flex flex-col space-y-3">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="p-2 bg-slate-100 rounded-md">
                          <div className="h-3 bg-slate-200 rounded w-2/3 mb-1"></div>
                          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h3 className="font-medium text-slate-800 text-lg">Available Investment Opportunities</h3>
        <div className="flex space-x-2">
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Returns">Sort by: Returns</SelectItem>
              <SelectItem value="Duration: Short to Long">Duration: Short to Long</SelectItem>
              <SelectItem value="Duration: Long to Short">Duration: Long to Short</SelectItem>
              <SelectItem value="Investment: Low to High">Investment: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-slate-400"></i>
            </div>
            <Input
              type="text"
              placeholder="Search investments"
              className="pl-9 pr-3 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {paginatedInvestments.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-slate-600">No investment opportunities found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="p-4 space-y-4">
            {paginatedInvestments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
          
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={sortedInvestments.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}

      <div className="mt-6 text-center pb-4">
        <button className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <i className="ri-add-line mr-1"></i>
          Create New Farm Business
        </button>
      </div>
    </div>
  );
};

export default InvestmentList;
