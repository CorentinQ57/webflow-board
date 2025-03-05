
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Index from "./pages/Index";
import Board from "./pages/Board";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            {/* Routes protégées (requièrent une connexion) */}
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Index />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/board/:id"
              element={
                <>
                  <SignedIn>
                    <Board />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/clients"
              element={
                <>
                  <SignedIn>
                    <Clients />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/sign-in" replace />
                  </SignedOut>
                </>
              }
            />

            {/* Routes d'authentification */}
            <Route
              path="/sign-in"
              element={
                <SignedOut>
                  <AuthPage mode="sign-in" />
                </SignedOut>
              }
            />
            <Route
              path="/sign-up"
              element={
                <SignedOut>
                  <AuthPage mode="sign-up" />
                </SignedOut>
              }
            />

            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
