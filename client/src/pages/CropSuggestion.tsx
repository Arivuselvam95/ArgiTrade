import { useState } from "react";
import useCropSuggestion from "@/hooks/useCropSuggestion";
import SuggestionForm from "@/components/crop-suggestion/SuggestionForm";
import ResultsSection from "@/components/crop-suggestion/ResultsSection";
import { CropSuggestionFormData, CropSuggestionResult } from "@/types";
import { useToast } from "@/hooks/use-toast";

const CropSuggestion = () => {
  const [results, setResults] = useState<CropSuggestionResult | null>(null);
  const { toast } = useToast();
  
  const {
    districts,
    soilTypes,
    isLoadingDistricts,
    submitCropSuggestion,
    isSubmitting,
    error
  } = useCropSuggestion();

  const handleSubmit = async (data: CropSuggestionFormData) => {
    try {
      const results = await submitCropSuggestion(data);
      setResults(results);
      
      // Scroll to results section after data is loaded
      setTimeout(() => {
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get crop suggestions. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (error) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          <p>Error: {error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-800">Regional Crop Suggestion</h2>
        <p className="text-slate-600 mt-1">Get personalized crop recommendations based on your local conditions</p>
      </div>

      {/* Input Form */}
      <SuggestionForm
        districts={districts}
        soilTypes={soilTypes}
        onSubmit={handleSubmit}
        isLoading={isSubmitting || isLoadingDistricts}
      />

      {/* Results Section */}
      {results && <ResultsSection results={results} />}
    </main>
  );
};

export default CropSuggestion;
