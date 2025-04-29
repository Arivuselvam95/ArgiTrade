import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Maximum number of page buttons to show
    
    if (totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include current page
      pageNumbers.push(currentPage);
      
      // Try to add pages before current page
      if (currentPage > 1) {
        pageNumbers.unshift(currentPage - 1);
      }
      
      // Try to add pages after current page
      if (currentPage < totalPages) {
        pageNumbers.push(currentPage + 1);
      }
      
      // If we still have room, add more pages
      if (pageNumbers.length < maxVisiblePages) {
        if (currentPage === totalPages && currentPage > 2) {
          pageNumbers.unshift(currentPage - 2);
        } else if (currentPage === 1 && totalPages > 2) {
          pageNumbers.push(currentPage + 2);
        }
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between flex-column flex-wrap sm:flex-row">
      <div className="flex-shrink-0">
        {totalItems !== undefined && itemsPerPage !== undefined && (
          <p className="text-sm text-slate-700">
            Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span> of <span className="font-medium">{totalItems}</span> results
          </p>
        )}
      </div>
      <div className="mt-2 sm:mt-0">
        <nav className="flex justify-center sm:justify-end">
          <button 
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <i className="ri-arrow-left-s-line"></i>
          </button>
          
          {pageNumbers.map((page) => (
            <button 
              key={page}
              className={`relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium ${
                currentPage === page 
                  ? 'text-primary-600' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
