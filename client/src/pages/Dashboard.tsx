import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Crop } from "@/types";
import StatsCard from "@/components/dashboard/StatsCard";
import ModuleCard from "@/components/dashboard/ModuleCard";
import MarketActivity from "@/components/dashboard/MarketActivity";

const Dashboard = () => {
  const { data: pricePredictionData, isLoading } = useQuery<{ allCrops: Crop[] }>({ 
    queryKey: ['/api/price-prediction'],
  });

  // Get current price data for dashboard stats
  const getTomato = () => pricePredictionData?.allCrops.find(crop => crop.cropName === "Tomato");
  const getWeatherForecast = () => {
    return {
      temperature: "28°C",
      condition: "Partly Cloudy",
      rainChance: "40%"
    };
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-600 mt-1">Welcome to AgriTrade, your smart agriculture platform</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon="ri-line-chart-line"
          iconBgColor="bg-primary-100"
          iconColor="text-primary-500"
          title="Current Market Value"
          value="₹62,500/Acre"
          trend={{ value: "12% from last month", isPositive: true }}
        />
        <StatsCard
          icon="ri-plant-line"
          iconBgColor="bg-secondary-100"
          iconColor="text-secondary-500"
          title="Recommended Crop"
          value={getTomato()?.cropName || "Tomato"}
          trend={{ value: "18% profit projection", isPositive: true }}
        />
        <StatsCard
          icon="ri-sun-line"
          iconBgColor="bg-amber-100"
          iconColor="text-amber-500"
          title="Weather Forecast"
          value={`${getWeatherForecast().temperature} | ${getWeatherForecast().condition}`}
          trend={{ value: `${getWeatherForecast().rainChance} chance of rain`, isPositive: false }}
        />
      </div>

      {/* Module Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ModuleCard
          title="Crop Price Prediction"
          description="Analyze historical data to predict crop prices and profitability."
          icon="ri-line-chart-line"
          bgColorFrom="from-primary-500"
          bgColorTo="to-primary-600"
          linkPath="/price-prediction"
          linkColor="text-primary-500"
        />
        <ModuleCard
          title="Regional Crop Suggestion"
          description="Get personalized crop recommendations based on local conditions."
          icon="ri-plant-line"
          bgColorFrom="from-secondary-500"
          bgColorTo="to-secondary-600"
          linkPath="/crop-suggestion"
          linkColor="text-secondary-500"
        />
        <ModuleCard
          title="Farm Hub"
          description="Trade agricultural products and invest in farm shares."
          icon="ri-store-2-line"
          bgColorFrom="from-amber-500"
          bgColorTo="to-amber-600"
          linkPath="/farm-hub"
          linkColor="text-amber-500"
        />
      </div>

      {/* Recent Market Activities */}
      <MarketActivity 
        crops={pricePredictionData?.allCrops || []} 
        isLoading={isLoading} 
      />
    </main>
  );
};

export default Dashboard;
