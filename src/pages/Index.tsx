
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Star, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import CreateBoard from "@/components/CreateBoard";
import { Project } from "@/lib/types";

// Mock data for demonstration
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Site E-commerce Maison Luxe",
    description: "Refonte complète du site e-commerce spécialisé dans la vente de produits de luxe pour la maison",
    coverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-10-20"),
  },
  {
    id: "2",
    title: "Portfolio Photographe Paris",
    description: "Création d'un portfolio haut de gamme pour un photographe professionnel parisien",
    coverImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2074&auto=format&fit=crop",
    createdAt: new Date("2023-08-10"),
    updatedAt: new Date("2023-10-15"),
  },
  {
    id: "3",
    title: "Application Web Réservation Restaurant",
    description: "Application web permettant la réservation de tables et la gestion des menus pour un restaurant gastronomique",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date("2023-07-22"),
    updatedAt: new Date("2023-10-05"),
  },
  {
    id: "4",
    title: "Blog Mode & Lifestyle",
    description: "Création d'un blog mode et lifestyle avec système de gestion de contenu personnalisé",
    coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date("2023-06-30"),
    updatedAt: new Date("2023-09-28"),
  },
  {
    id: "5",
    title: "Site Vitrine Cabinet d'Avocats",
    description: "Site vitrine pour un cabinet d'avocats spécialisé en droit des affaires et propriété intellectuelle",
    coverImage: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=1974&auto=format&fit=crop",
    createdAt: new Date("2023-06-05"),
    updatedAt: new Date("2023-09-15"),
  },
  {
    id: "6",
    title: "Application de Gestion Immobilière",
    description: "Application web pour la gestion de biens immobiliers, locations et maintenance",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
    createdAt: new Date("2023-05-20"),
    updatedAt: new Date("2023-09-01"),
  },
];

const Index = () => {
  const [createBoardOpen, setCreateBoardOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleCreateBoard = (title: string, description: string) => {
    const newProject: Project = {
      id: `${projects.length + 1}`,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setProjects([newProject, ...projects]);
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <header className="mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Tableaux de bord
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Gérez l'ensemble de vos projets de sites web dans un espace centralisé.
            </motion.p>
          </header>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Star size={16} className="mr-2 text-yellow-500" />
                  Projets favoris
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {projects.length > 0 ? "3 projets favoris" : "Aucun projet favori"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Clock size={16} className="mr-2 text-blue-500" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Dernière activité il y a 2 heures
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="mb-4 text-primary-foreground/80">
                  Commencez un nouveau projet
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setCreateBoardOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Nouveau projet
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">Tous les projets</TabsTrigger>
              <TabsTrigger value="recent">Récents</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: projects.length * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="h-full w-full border-dashed flex flex-col items-center justify-center gap-3 p-8"
                    onClick={() => setCreateBoardOpen(true)}
                  >
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Plus size={24} className="text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-1">Créer un projet</h3>
                      <p className="text-sm text-muted-foreground">
                        Démarrez un nouveau projet web
                      </p>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="favorites">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Vous n'avez pas encore de projets favoris
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setCreateBoardOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Nouveau projet
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Projets récemment consultés</h2>
              <Button variant="ghost" size="sm" className="gap-1">
                Voir tous <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.slice(0, 4).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <CreateBoard 
        isOpen={createBoardOpen}
        onClose={() => setCreateBoardOpen(false)}
        onCreate={handleCreateBoard}
      />
    </>
  );
};

export default Index;
