import { useState } from "react";
import { Link } from "wouter";

interface HeaderProps {
  currentRoute: string;
}

const Header = ({ currentRoute }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return currentRoute === path;
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="flex items-center">
                  <span className="text-primary-500 text-3xl mr-2">
                    <i className="ri-plant-line"></i>
                  </span>
                  <h1 className="text-primary-600 font-heading font-bold text-xl sm:text-2xl">
                    AgriTrade
                  </h1>
                </a>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/">
                <a className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive("/") 
                    ? "text-primary-500 bg-primary-50" 
                    : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                }`}>
                  Dashboard
                </a>
              </Link>
              <Link href="/price-prediction">
                <a className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive("/price-prediction") 
                    ? "text-primary-500 bg-primary-50" 
                    : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                }`}>
                  Price Prediction
                </a>
              </Link>
              <Link href="/crop-suggestion">
                <a className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive("/crop-suggestion") 
                    ? "text-primary-500 bg-primary-50" 
                    : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                }`}>
                  Crop Suggestion
                </a>
              </Link>
              <Link href="/farm-hub">
                <a className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive("/farm-hub") 
                    ? "text-primary-500 bg-primary-50" 
                    : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                }`}>
                  Farm Hub
                </a>
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="ml-4 relative p-1 rounded-full text-slate-600 hover:text-primary-500 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-secondary-500 text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="ml-4 flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <span className="text-sm font-medium">FS</span>
              </div>
              <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:block">Farmer Suresh</span>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="text-slate-600 hover:text-primary-500 focus:outline-none"
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/">
                <a 
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/") 
                      ? "text-primary-500 bg-primary-50" 
                      : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
              </Link>
              <Link href="/price-prediction">
                <a 
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/price-prediction") 
                      ? "text-primary-500 bg-primary-50" 
                      : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Price Prediction
                </a>
              </Link>
              <Link href="/crop-suggestion">
                <a 
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/crop-suggestion") 
                      ? "text-primary-500 bg-primary-50" 
                      : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Crop Suggestion
                </a>
              </Link>
              <Link href="/farm-hub">
                <a 
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    isActive("/farm-hub") 
                      ? "text-primary-500 bg-primary-50" 
                      : "text-slate-600 hover:text-primary-500 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Farm Hub
                </a>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
