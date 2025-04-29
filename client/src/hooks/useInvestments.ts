import { useQuery } from "@tanstack/react-query";
import { Investment, InvestmentSummaryData } from "@/types";

const useInvestments = () => {
  // Fetch investment opportunities
  const {
    data: investments = [],
    isLoading: isLoadingInvestments,
    error: errorInvestments
  } = useQuery<Investment[]>({
    queryKey: ['/api/investments'],
  });

  // In a real app, this would be fetched from the backend
  // For now, using static data for the investment summary
  const investmentSummary: InvestmentSummaryData = {
    totalInvestment: 75000,
    activeInvestments: 3,
    currentReturns: 12500,
    returnPercentage: 16.7
  };
  const isLoadingSummary = isLoadingInvestments;

  // Enhance investments with farmer details (in a real app, this would come from the backend)
  const enhancedInvestments = investments.map(investment => ({
    ...investment,
    farmerName: investment.farmerName || "Farmer Name",
    farmerInitials: investment.farmerInitials || investment.title.substring(0, 2).toUpperCase(),
  }));

  return {
    investments: enhancedInvestments,
    isLoadingInvestments,
    errorInvestments,
    investmentSummary,
    isLoadingSummary
  };
};

export default useInvestments;
