import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CropSuggestionFormData, CropSuggestionResult, District, SoilType } from "@/types";

const useCropSuggestion = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch districts
  const { 
    data: districts = [],
    isLoading: isLoadingDistricts,
    error: districtsError
  } = useQuery<District[]>({ 
    queryKey: ['/api/districts'],
  });

  // Define soil types (static data)
  const soilTypes: SoilType[] = [
    { id: 1, name: "Black" },
    { id: 2, name: "Red" },
    { id: 3, name: "Alluvial" },
    { id: 4, name: "Sandy" },
    { id: 5, name: "Clay" },
    { id: 6, name: "Loamy" }
  ];

  const submitCropSuggestion = async (formData: CropSuggestionFormData): Promise<CropSuggestionResult> => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/crop-suggestion", formData);
      const data = await response.json();
      return data as CropSuggestionResult;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    districts,
    soilTypes,
    isLoadingDistricts,
    isSubmitting,
    error: error || districtsError,
    submitCropSuggestion
  };
};

export default useCropSuggestion;
