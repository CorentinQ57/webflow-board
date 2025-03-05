
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

import Index from "./pages/Index";
import Board from "./pages/Board";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
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
                  session ? <Index /> : <Navigate to="/sign-in" replace />
                }
              />
              <Route
                path="/board/:id"
                element={
                  session ? <Board /> : <Navigate to="/sign-in" replace />
                }
              />
              <Route
                path="/clients"
                element={
                  session ? <Clients /> : <Navigate to="/sign-in" replace />
                }
              />

              {/* Routes d'authentification */}
              <Route
                path="/sign-in"
                element={
                  session ? <Navigate to="/" replace /> : <AuthPage mode="sign-in" />
                }
              />
              <Route
                path="/sign-up"
                element={
                  session ? <Navigate to="/" replace /> : <AuthPage mode="sign-up" />
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
};

export default App;
