import { useQuery } from "@tanstack/react-query";
import { PricePredictionData } from "@/types";

const usePricePrediction = () => {
  const { 
    data: pricePredictionData, 
    isLoading, 
    error 
  } = useQuery<PricePredictionData>({ 
    queryKey: ['/api/price-prediction'],
  });

  return {
    pricePredictionData,
    isLoading,
    error
  };
};

export default usePricePrediction;
