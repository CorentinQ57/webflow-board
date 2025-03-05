
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/lib/types";
import { toast } from "sonner";

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erreur de connexion:", error);
    toast.error("Échec de la connexion: " + error.message);
    return null;
  }

  return data.session;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Erreur d'inscription:", error);
    toast.error("Échec de l'inscription: " + error.message);
    return null;
  }

  toast.success("Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.");
  return data.session;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erreur de déconnexion:", error);
    toast.error("Échec de la déconnexion");
    return false;
  }

  return true;
};

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getCurrentUserProfile = async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return null;
  }

  return data;
};

export const updateProfile = async (profile: Partial<Profile>) => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    toast.error("Échec de la mise à jour du profil");
    return null;
  }

  toast.success("Profil mis à jour avec succès");
  return data;
};

// Fonction pour créer un compte admin (à utiliser avec précaution)
export const createAdminAccount = async (email: string, password: string) => {
  // D'abord, on crée un compte utilisateur normal
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Erreur lors de la création du compte admin:", error);
    toast.error("Échec de la création du compte admin");
    return null;
  }

  const userId = data.user?.id;
  if (!userId) return null;

  // Ensuite, on met à jour le profil pour définir is_admin à true
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ is_admin: true })
    .eq("id", userId);

  if (profileError) {
    console.error("Erreur lors de la définition des privilèges admin:", profileError);
    toast.error("Compte créé mais échec de l'attribution des privilèges admin");
    return null;
  }

  toast.success("Compte admin créé avec succès! Veuillez vérifier votre email pour confirmer votre compte.");
  return data.session;
};
