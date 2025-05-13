import { useState } from "react";
import useMarketplace from "@/hooks/useMarketplace";
import useInvestments from "@/hooks/useInvestments";
import ProductFilters from "@/components/farm-hub/marketplace/ProductFilters";
import ProductList from "@/components/farm-hub/marketplace/ProductList";
import InvestmentSummary from "@/components/farm-hub/agri-trade/InvestmentSummary";
import InvestmentList from "@/components/farm-hub/agri-trade/InvestmentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductFilters as ProductFiltersType } from "@/types";

const FarmHub = () => {
  const [activeTab, setActiveTab] = useState("marketplace");

  // Marketplace data
  const {
    products,
    isLoadingProducts,
    errorProducts,
    filters,
    setFilters
  } = useMarketplace();

  // Investments data
  const {
    investments,
    isLoadingInvestments,
    errorInvestments,
    investmentSummary,
    isLoadingSummary
  } = useInvestments();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleFilterChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-800">Farm Hub</h2>
        <p className="text-slate-600 mt-1">Trade agricultural products and invest in farm shares</p>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-slate-200">
            <TabsList className="w-full h-auto border-0 bg-transparent rounded-none">
            <TabsTrigger 
              value="marketplace" 
              className="flex-1 py-4 px-1 data-[state=active]:text-emerald-600 data-[state=active]:border-emerald-500 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:border-slate-300 whitespace-nowrap font-medium text-sm rounded-none"
            >
              <i className="ri-store-2-line mr-1"></i>
              Marketplace
            </TabsTrigger>
            <TabsTrigger 
            value="agri-trade" 
            className="flex-1 py-4 px-1 data-[state=active]:text-indigo-600 data-[state=active]:border-indigo-500 data-[state=active]:border-b-2 data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-slate-700 data-[state=inactive]:hover:border-slate-300 whitespace-nowrap font-medium text-sm rounded-none"
          >
            <i className="ri-exchange-line mr-1"></i>
            Agri-Trade
          </TabsTrigger>

            </TabsList>
          </div>
        </div>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace">
          {errorProducts && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <p>Error loading products: {errorProducts.message}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <div className="md:w-1/4">
              <ProductFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
            <div className="md:w-3/4">
              <ProductList 
                products={products} 
                isLoading={isLoadingProducts}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </TabsContent>

        {/* Agri-Trade Tab */}
        <TabsContent value="agri-trade">
          {errorInvestments && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              <p>Error loading investments: {errorInvestments.message}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <div className="md:w-1/4">
              <InvestmentSummary 
                data={investmentSummary} 
                isLoading={isLoadingSummary}
              />
            </div>
            <div className="md:w-3/4">
              <InvestmentList 
                investments={investments} 
                isLoading={isLoadingInvestments}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default FarmHub;
