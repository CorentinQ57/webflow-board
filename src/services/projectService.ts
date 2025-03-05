
import { supabase } from "@/integrations/supabase/client";
import { Project, ProjectMember, Board } from "@/lib/types";
import { toast } from "sonner";

export const fetchProjects = async (): Promise<Project[]> => {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    toast.error("Impossible de récupérer vos projets");
    return [];
  }

  // Récupérer les membres pour chaque projet
  const projectsWithMembers = await Promise.all(
    projects.map(async (project) => {
      const { data: members, error: membersError } = await supabase
        .from("project_members")
        .select("*")
        .eq("project_id", project.id);

      if (membersError) {
        console.error(`Erreur lors de la récupération des membres du projet ${project.id}:`, membersError);
        return { ...project, members: [] };
      }

      return { ...project, members: members || [] };
    })
  );

  return projectsWithMembers;
};

export const createProject = async (title: string, description: string): Promise<Project | null> => {
  // Récupérer l'ID de l'utilisateur connecté
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error("Vous devez être connecté pour créer un projet");
    return null;
  }

  // Créer le projet
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      owner_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de la création du projet:", error);
    toast.error("Impossible de créer le projet");
    return null;
  }

  // Ajouter l'utilisateur comme membre du projet avec le rôle "owner"
  const { error: memberError } = await supabase
    .from("project_members")
    .insert({
      project_id: project.id,
      user_id: user.id,
      role: "owner",
      email: user.email,
      invitation_accepted: true
    });

  if (memberError) {
    console.error("Erreur lors de l'ajout du membre au projet:", memberError);
    toast.error("Projet créé mais impossible d'ajouter le propriétaire comme membre");
  }

  return { ...project, members: [] };
};

export const createBoard = async (projectId: string, title: string, description: string): Promise<Board | null> => {
  const { data: board, error } = await supabase
    .from("boards")
    .insert({
      project_id: projectId,
      title,
      description
    })
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de la création du tableau:", error);
    toast.error("Impossible de créer le tableau");
    return null;
  }

  return board;
};

export const deleteProject = async (projectId: string): Promise<boolean> => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    toast.error("Impossible de supprimer le projet");
    return false;
  }

  toast.success("Projet supprimé avec succès");
  return true;
};
