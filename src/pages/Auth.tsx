
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signIn, signUp } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";

export interface AuthPageProps {
  mode?: "sign-in" | "sign-up";
}

const AuthPage = ({ mode = "sign-in" }: AuthPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Afficher un loader pendant la vérification de l'authentification
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Rediriger l'utilisateur s'il est déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "sign-in") {
        const session = await signIn(email, password);
        if (session) {
          console.log("Connexion réussie, redirection...");
          navigate("/", { replace: true });
        }
      } else {
        const session = await signUp(email, password);
        if (session) {
          toast.success("Compte créé avec succès! Veuillez vérifier votre email pour confirmer votre compte.");
        }
      }
    } catch (error: any) {
      console.error("Erreur d'authentification:", error);
      toast.error(error.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b">
        <div className="container mx-auto">
          <div className="font-bold text-xl flex items-center gap-2 text-primary">
            <span className="bg-primary text-white p-1 rounded">WP</span>
            <span>WebProjects</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {mode === "sign-in" ? "Connexion" : "Inscription"}
              </h1>
              <p className="text-muted-foreground">
                {mode === "sign-in"
                  ? "Connectez-vous pour accéder à vos projets"
                  : "Créez un compte pour commencer"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Chargement..." : mode === "sign-in" ? "Se connecter" : "S'inscrire"}
              </Button>
              
              <div className="text-center text-sm mt-4">
                {mode === "sign-in" ? (
                  <p>
                    Pas encore de compte ?{" "}
                    <a href="/sign-up" className="text-primary hover:underline">
                      S'inscrire
                    </a>
                  </p>
                ) : (
                  <p>
                    Déjà un compte ?{" "}
                    <a href="/sign-in" className="text-primary hover:underline">
                      Se connecter
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Ajout d'un bouton pour créer facilement un compte admin */}
          <div className="mt-4 text-center">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setEmail("admin@webprojects.com");
                setPassword("admin123");
                if (mode === "sign-up") {
                  toast.info("Les identifiants pour un compte admin ont été pré-remplis. Vous pouvez vous inscrire maintenant.");
                } else {
                  toast.info("Les identifiants pour un compte admin ont été pré-remplis. Vous pouvez vous connecter maintenant.");
                }
              }}
            >
              Utiliser un compte admin de test
            </a>
          </div>
        </motion.div>
      </main>

      <footer className="py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebProjects. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
