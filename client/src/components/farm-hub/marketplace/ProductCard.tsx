import React from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use a default image URL for now since we can't include actual images
  const defaultImageUrl = "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="h-40 bg-slate-100 relative">
        {/* Using a div with background image as fallback */}
        <div
          className="w-full h-full object-cover"
          style={{ backgroundImage: `url(${product.imageUrl || defaultImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <span className="absolute top-2 right-2 bg-white bg-opacity-90 text-xs font-medium px-2 py-1 rounded-full text-slate-700">
          <i className="ri-map-pin-line mr-0.5 text-primary-500"></i>
          {product.distance || Math.floor(Math.random() * 20) + 1} km away
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-slate-800 font-medium">{product.name}</h4>
          <span className="text-primary-600 font-semibold">₹{product.price}/{product.unit}</span>
        </div>
        <div className="text-sm text-slate-600 mb-3">{product.description}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs">
              {product.sellerInitials}
            </div>
            <span className="ml-1.5 text-xs text-slate-600">{product.sellerName}</span>
          </div>
          <button className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100">
            Contact Farmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
