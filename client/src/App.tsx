import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoginTerminal } from "./components/LoginTerminal";
import { MainInterface } from "./components/MainInterface";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAccessGranted = () => {
    setIsLoggedIn(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-tva-dark text-tva-text overflow-x-hidden">
          {!isLoggedIn ? (
            <LoginTerminal onAccessGranted={handleAccessGranted} />
          ) : (
            <MainInterface />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
