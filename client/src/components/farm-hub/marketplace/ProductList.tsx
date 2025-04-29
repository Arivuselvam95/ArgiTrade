import React, { useState } from "react";
import { Product, ProductFilters } from "@/types";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Pagination from "@/components/ui/Pagination";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, filters, onFilterChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
    setCurrentPage(1);
  };
  
  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Distance: Nearest":
        return (a.distance || 0) - (b.distance || 0);
      default: // Latest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <h3 className="font-medium text-slate-800 text-lg">Available Products</h3>
          <div className="flex space-x-2">
            <div className="relative w-32">
              <div className="h-10 bg-slate-200 rounded-md animate-pulse"></div>
            </div>
            <div className="relative w-48">
              <div className="h-10 bg-slate-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="h-40 bg-slate-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
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
        <h3 className="font-medium text-slate-800 text-lg">Available Products</h3>
        <div className="flex space-x-2">
          <Select onValueChange={handleSortChange} defaultValue={filters.sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sort by: Latest">Sort by: Latest</SelectItem>
              <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
              <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
              <SelectItem value="Distance: Nearest">Distance: Nearest</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-slate-400"></i>
            </div>
            <Input
              type="text"
              placeholder="Search products"
              className="pl-9 pr-3 py-2 text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      
      {paginatedProducts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-slate-600">No products found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={sortedProducts.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}

      <div className="mt-6 text-center pb-4">
        <button className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <i className="ri-add-line mr-1"></i>
          List Your Product
        </button>
      </div>
    </div>
  );
};

export default ProductList;
