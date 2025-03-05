
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Project } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { fetchProjects, createProject } from "@/services/projectService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos projets",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [toast]);

  const handleCreateProject = async () => {
    if (!newProjectTitle.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre du projet est obligatoire",
        variant: "destructive",
      });
      return;
    }

    try {
      const newProject = await createProject(newProjectTitle.trim(), newProjectDescription.trim());
      if (newProject) {
        setProjects([...projects, newProject]);
        setNewProjectTitle("");
        setNewProjectDescription("");
        setIsDialogOpen(false);
        toast({
          title: "Succès",
          description: "Projet créé avec succès",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création du projet:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-6 px-6 md:px-8 lg:px-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Mes projets</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Nouveau projet
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un nouveau projet</DialogTitle>
                  <DialogDescription>
                    Ajoutez les détails de votre nouveau projet ci-dessous.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="col-span-4">
                      Titre du projet
                    </Label>
                    <Input
                      id="title"
                      placeholder="Mon super projet"
                      className="col-span-4"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="col-span-4">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Description de mon projet"
                      className="col-span-4"
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateProject}>Créer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border rounded-lg shadow-sm h-[200px] animate-pulse"
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-[400px] bg-muted/20 rounded-lg border border-dashed"
            >
              <h3 className="text-xl font-medium mb-2">Vous n'avez pas encore de projets</h3>
              <p className="text-muted-foreground mb-4">
                Créez votre premier projet pour commencer à travailler avec votre équipe
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau projet
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <Link key={project.id} to={`/board/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
