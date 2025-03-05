
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Plus, 
  MoreHorizontal, 
  Users, 
  Calendar, 
  Filter, 
  Search,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Column from "@/components/Column";
import { Board, Column as ColumnType } from "@/lib/types";

// Mock data for demonstration
const getMockBoard = (id: string): Board => ({
  id,
  projectId: "1",
  title: "Site E-commerce Maison Luxe",
  description: "Refonte complète du site e-commerce spécialisé dans la vente de produits de luxe pour la maison",
  columns: [
    {
      id: "col1",
      boardId: id,
      title: "À faire",
      order: 0,
      tasks: [
        {
          id: "task1",
          columnId: "col1",
          title: "Maquettes page d'accueil",
          description: "Créer les maquettes pour la page d'accueil en version desktop et mobile",
          tags: [
            { id: "tag1", name: "Design", color: "#3B82F6" },
            { id: "tag2", name: "Urgent", color: "#EF4444" }
          ],
          assignees: ["user1", "user2"],
          dueDate: new Date("2023-11-15"),
          createdAt: new Date("2023-10-01"),
          updatedAt: new Date("2023-10-05"),
        },
        {
          id: "task2",
          columnId: "col1",
          title: "Structure de base de données",
          description: "Définir la structure de la base de données pour les produits et les utilisateurs",
          tags: [
            { id: "tag3", name: "Backend", color: "#10B981" }
          ],
          assignees: ["user3"],
          createdAt: new Date("2023-10-02"),
          updatedAt: new Date("2023-10-02"),
        },
        {
          id: "task3",
          columnId: "col1",
          title: "Recherche de solutions de paiement",
          description: "Comparer les différentes solutions de paiement en ligne pour e-commerce",
          tags: [
            { id: "tag4", name: "Recherche", color: "#8B5CF6" }
          ],
          createdAt: new Date("2023-10-03"),
          updatedAt: new Date("2023-10-03"),
        }
      ]
    },
    {
      id: "col2",
      boardId: id,
      title: "En cours",
      order: 1,
      tasks: [
        {
          id: "task4",
          columnId: "col2",
          title: "Intégration page produit",
          description: "Intégrer la page produit selon les maquettes validées",
          coverImage: "https://images.unsplash.com/photo-1627844718626-4c6f71767d7b?q=80&w=2070&auto=format&fit=crop",
          tags: [
            { id: "tag5", name: "Frontend", color: "#F59E0B" }
          ],
          assignees: ["user4"],
          dueDate: new Date("2023-11-10"),
          createdAt: new Date("2023-10-05"),
          updatedAt: new Date("2023-10-08"),
        },
        {
          id: "task5",
          columnId: "col2",
          title: "API de gestion des produits",
          description: "Développer l'API pour la gestion des produits (CRUD)",
          tags: [
            { id: "tag3", name: "Backend", color: "#10B981" }
          ],
          assignees: ["user3", "user5"],
          createdAt: new Date("2023-10-06"),
          updatedAt: new Date("2023-10-09"),
        }
      ]
    },
    {
      id: "col3",
      boardId: id,
      title: "Révision",
      order: 2,
      tasks: [
        {
          id: "task6",
          columnId: "col3",
          title: "Révision des textes marketing",
          description: "Relecture et correction des textes marketing pour les pages principales",
          tags: [
            { id: "tag6", name: "Contenu", color: "#EC4899" }
          ],
          assignees: ["user6"],
          dueDate: new Date("2023-11-05"),
          createdAt: new Date("2023-10-07"),
          updatedAt: new Date("2023-10-10"),
        }
      ]
    },
    {
      id: "col4",
      boardId: id,
      title: "Terminé",
      order: 3,
      tasks: [
        {
          id: "task7",
          columnId: "col4",
          title: "Définition des besoins client",
          description: "Entretiens avec le client pour définir les besoins précis du projet",
          tags: [
            { id: "tag7", name: "Planning", color: "#6366F1" }
          ],
          assignees: ["user1", "user7"],
          createdAt: new Date("2023-09-25"),
          updatedAt: new Date("2023-09-28"),
        },
        {
          id: "task8",
          columnId: "col4",
          title: "Benchmark concurrentiel",
          description: "Analyse de la concurrence et des meilleures pratiques dans le secteur",
          tags: [
            { id: "tag4", name: "Recherche", color: "#8B5CF6" }
          ],
          assignees: ["user2"],
          createdAt: new Date("2023-09-26"),
          updatedAt: new Date("2023-09-29"),
        },
        {
          id: "task9",
          columnId: "col4",
          title: "Charte graphique",
          description: "Création de la charte graphique en accord avec l'identité de la marque",
          coverImage: "https://images.unsplash.com/photo-1634942536790-a1166cc8b4c8?q=80&w=1000&auto=format&fit=crop",
          tags: [
            { id: "tag1", name: "Design", color: "#3B82F6" }
          ],
          assignees: ["user4"],
          createdAt: new Date("2023-09-27"),
          updatedAt: new Date("2023-09-30"),
        }
      ]
    }
  ],
  createdAt: new Date("2023-09-15"),
  updatedAt: new Date("2023-10-20"),
});

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API request
    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        setBoard(getMockBoard(id));
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAddTask = (columnId: string) => {
    // Function to handle adding a new task to a column
    console.log(`Add task to column ${columnId}`);
    // This would normally open a modal or form to create a new task
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-32 bg-muted rounded"></div>
          <div className="h-4 w-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Tableau introuvable</h1>
        <p className="text-muted-foreground mb-6">
          Le tableau que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button asChild>
          <Link to="/">
            <ChevronLeft size={16} className="mr-2" />
            Retour aux tableaux
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-16">
        <header className="border-b p-4 bg-background/80 backdrop-blur-sm sticky top-16 z-10">
          <div className="container mx-auto">
            <div className="flex items-center mb-4">
              <Button variant="ghost" size="sm" asChild className="mr-2">
                <Link to="/">
                  <ChevronLeft size={16} className="mr-1" />
                  Tableaux
                </Link>
              </Button>
              
              <h1 className="text-xl font-bold">{board.title}</h1>
              
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Calendar size={14} />
                  <span>Calendrier</span>
                </Button>
                
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Users size={14} />
                  <span>Équipe</span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreHorizontal size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings size={15} className="mr-2" />
                      Paramètres du tableau
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Users size={15} className="mr-2" />
                      Gérer les membres
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Supprimer le tableau
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher des tâches..." 
                  className="pl-8 h-9"
                />
              </div>
              
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter size={14} />
                <span>Filtres</span>
              </Button>
              
              <Button size="sm" className="gap-1.5">
                <Plus size={14} />
                <span>Ajouter une colonne</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-4 min-h-[calc(100vh-180px)]">
            {board.columns.map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Column 
                  column={column} 
                  onAddTask={handleAddTask} 
                />
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: board.columns.length * 0.1 }}
              className="w-80 min-w-80"
            >
              <Button 
                variant="outline" 
                className="border-dashed h-full w-full flex flex-col items-center justify-center gap-2 p-8"
              >
                <Plus size={20} />
                <span>Ajouter une colonne</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BoardPage;
