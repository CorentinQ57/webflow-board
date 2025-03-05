
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/lib/AuthContext";

import Index from "./pages/Index";
import Board from "./pages/Board";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

// Composant pour les routes protégées
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  // Afficher un loader plus visible pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-primary">Chargement de votre session...</span>
      </div>
    );
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    console.log("Non authentifié, redirection vers /sign-in");
    return <Navigate to="/sign-in" replace />;
  }

  // Si authentifié, afficher la page demandée
  return element;
};

// Composant pour les routes d'authentification
const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-primary">Chargement de votre session...</span>
      </div>
    );
  }

  // Rediriger vers la page d'accueil si l'utilisateur est déjà authentifié
  if (isAuthenticated) {
    console.log("Déjà authentifié, redirection vers /");
    return <Navigate to="/" replace />;
  }

  // Si non authentifié, afficher la page d'authentification
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes protégées (requièrent une connexion) */}
      <Route path="/" element={<ProtectedRoute element={<Index />} />} />
      <Route path="/board/:id" element={<ProtectedRoute element={<Board />} />} />
      <Route path="/clients" element={<ProtectedRoute element={<Clients />} />} />

      {/* Routes d'authentification */}
      <Route path="/sign-in" element={<AuthRoute element={<AuthPage mode="sign-in" />} />} />
      <Route path="/sign-up" element={<AuthRoute element={<AuthPage mode="sign-up" />} />} />

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence>
              <AppRoutes />
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
