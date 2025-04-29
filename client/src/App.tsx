import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Dashboard from "@/pages/Dashboard";
import PricePrediction from "@/pages/PricePrediction";
import CropSuggestion from "@/pages/CropSuggestion";
import FarmHub from "@/pages/FarmHub";
import NotFound from "@/pages/not-found";

function Router() {
  const [currentRoute, setCurrentRoute] = useState("/");

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRoute={currentRoute} />

      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/price-prediction" component={PricePrediction} />
        <Route path="/crop-suggestion" component={CropSuggestion} />
        <Route path="/farm-hub" component={FarmHub} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
