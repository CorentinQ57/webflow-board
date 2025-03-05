
import React from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";

export interface AuthPageProps {
  mode?: "sign-in" | "sign-up";
}

const AuthPage = ({ mode = "sign-in" }: AuthPageProps) => {
  const { isSignedIn } = useAuth();

  // Rediriger l'utilisateur s'il est déjà connecté
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

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

            <div className={cn("mx-auto")}>
              {mode === "sign-in" ? (
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-full mx-auto",
                      card: "shadow-none p-0 border-0",
                      header: "hidden",
                      footer: "hidden",
                    },
                  }}
                  redirectUrl="/dashboard"
                />
              ) : (
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "w-full mx-auto",
                      card: "shadow-none p-0 border-0",
                      header: "hidden",
                      footer: "hidden",
                    },
                  }}
                  redirectUrl="/dashboard"
                />
              )}
            </div>
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
