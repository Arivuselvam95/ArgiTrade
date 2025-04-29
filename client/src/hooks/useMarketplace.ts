import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, ProductFilters } from "@/types";

const useMarketplace = () => {
  // Default filters
  const [filters, setFilters] = useState<ProductFilters>({
    category: "All Categories",
    location: "All Locations",
    sortBy: "Sort by: Latest"
  });

  // Build query string from filters
  const getQueryString = () => {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== "All Categories") {
      params.append("category", filters.category);
    }
    
    if (filters.minPrice) {
      params.append("minPrice", filters.minPrice.toString());
    }
    
    if (filters.maxPrice) {
      params.append("maxPrice", filters.maxPrice.toString());
    }
    
    if (filters.location && filters.location !== "All Locations") {
      params.append("location", filters.location);
    }
    
    return params.toString();
  };

  // Fetch products based on filters
  const queryString = getQueryString();
  const { 
    data: products = [],
    isLoading: isLoadingProducts,
    error: errorProducts
  } = useQuery<Product[]>({ 
    queryKey: [`/api/products?${queryString}`],
  });

  // Function to simulate distances for demo purposes (in a real app, this would come from the backend)
  const productsWithDistance = products.map(product => ({
    ...product,
    distance: product.distance || Math.floor(Math.random() * 20) + 1,
    // These fields would normally come from the backend, but adding here for UI display
    sellerName: product.sellerName || "Farmer Name", 
    sellerInitials: product.sellerInitials || product.name.substring(0, 2).toUpperCase(),
  }));

  return {
    products: productsWithDistance,
    isLoadingProducts,
    errorProducts,
    filters,
    setFilters
  };
};

export default useMarketplace;
