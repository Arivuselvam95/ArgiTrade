import React from "react";
import { CropSuggestionResult } from "@/types";
import CropCard from "./CropCard";

interface ResultsSectionProps {
  results: CropSuggestionResult | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  return (
    <div id="results-section" className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold">Recommended Crops</h3>
        <div className="mt-2 md:mt-0 flex items-center text-sm text-slate-600">
          <i className="ri-map-pin-line mr-1"></i>
          <span>{results.district} District</span>
          <span className="mx-2">•</span>
          <span>{results.soilType}</span>
          <span className="mx-2">•</span>
          <span>pH: {results.phLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.suggestedCrops.map((crop, index) => (
          <CropCard key={index} crop={crop} />
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;
