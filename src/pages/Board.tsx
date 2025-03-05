
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Column from "@/components/Column";
import CreateBoard from "@/components/CreateBoard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Board, Column as ColumnType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

const BoardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateColumn, setShowCreateColumn] = useState(false);
  const { toast } = useToast();

  // Exemple de données (à remplacer par des appels API réels)
  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);
      // Simuler un appel API
      setTimeout(() => {
        const mockBoard: Board = {
          id: id || "",
          project_id: "project-1",
          title: "Tableau de développement",
          description: "Suivi des tâches pour le sprint actuel",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const mockColumns: ColumnType[] = [
          {
            id: "column-1",
            board_id: id || "",
            title: "À faire",
            order: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tasks: [
              {
                id: "task-1",
                column_id: "column-1",
                title: "Concevoir la maquette de l'application",
                description: "Créer des wireframes pour les principales pages de l'application.",
                cover_image: "https://images.unsplash.com/photo-1611532736597-8bc38bc72f71?auto=format&fit=crop&q=80&w=1000",
                due_date: new Date(Date.now() + 86400000 * 3).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                tags: [
                  {
                    id: "tag-1",
                    name: "Design",
                    color: "#F87171",
                    project_id: "project-1",
                    created_at: new Date().toISOString()
                  }
                ],
                assignees: ["user-1", "user-2"]
              },
              {
                id: "task-2",
                column_id: "column-1",
                title: "Configurer l'environnement de développement",
                description: "Installer et configurer les outils nécessaires au développement.",
                cover_image: null,
                due_date: new Date(Date.now() + 86400000 * 1).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                tags: [
                  {
                    id: "tag-2",
                    name: "Setup",
                    color: "#60A5FA",
                    project_id: "project-1",
                    created_at: new Date().toISOString()
                  }
                ],
                assignees: ["user-3"]
              }
            ]
          },
          {
            id: "column-2",
            board_id: id || "",
            title: "En cours",
            order: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tasks: [
              {
                id: "task-3",
                column_id: "column-2",
                title: "Implémenter l'authentification",
                description: "Créer les pages de connexion et d'inscription et configurer l'API d'authentification.",
                cover_image: null,
                due_date: new Date(Date.now() + 86400000 * 2).toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                tags: [
                  {
                    id: "tag-3",
                    name: "Backend",
                    color: "#34D399",
                    project_id: "project-1",
                    created_at: new Date().toISOString()
                  },
                  {
                    id: "tag-4",
                    name: "Frontend",
                    color: "#A78BFA",
                    project_id: "project-1",
                    created_at: new Date().toISOString()
                  }
                ],
                assignees: ["user-1"]
              }
            ]
          },
          {
            id: "column-3",
            board_id: id || "",
            title: "Terminé",
            order: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            tasks: [
              {
                id: "task-4",
                column_id: "column-3",
                title: "Créer le backlog du projet",
                description: "Définir les fonctionnalités clés et les tâches prioritaires.",
                cover_image: null,
                due_date: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                tags: [
                  {
                    id: "tag-5",
                    name: "Planning",
                    color: "#FBBF24",
                    project_id: "project-1",
                    created_at: new Date().toISOString()
                  }
                ],
                assignees: ["user-1", "user-2", "user-3"]
              }
            ]
          }
        ];

        setBoard(mockBoard);
        setColumns(mockColumns);
        setLoading(false);
      }, 1000);
    };

    fetchBoard();
  }, [id, toast]);

  const handleCreateColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: `column-${Date.now()}`,
      board_id: id || "",
      title,
      order: columns.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tasks: []
    };

    setColumns([...columns, newColumn]);
    setShowCreateColumn(false);

    toast({
      title: "Colonne créée",
      description: `La colonne "${title}" a été créée avec succès.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 py-6 px-6 md:px-8 lg:px-12 overflow-x-auto">
        <div className="flex flex-col gap-8">
          {loading ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{board?.title}</h1>
                  {board?.description && (
                    <p className="text-muted-foreground mt-1">{board.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Inviter</Button>
                  <Button>Paramètres</Button>
                </div>
              </div>

              <div className="flex space-x-4 pb-4 overflow-x-auto min-h-[75vh]">
                {columns.map((column) => (
                  <Column key={column.id} column={column} />
                ))}

                {showCreateColumn ? (
                  <CreateBoard
                    title="Nouvelle colonne"
                    onSubmit={handleCreateColumn}
                    onCancel={() => setShowCreateColumn(false)}
                    className="w-[280px] shrink-0"
                    buttonLabel="Créer la colonne"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-[280px] shrink-0 h-min"
                  >
                    <Button
                      variant="ghost"
                      className="border-2 border-dashed border-muted-foreground/20 h-16 w-full text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-all"
                      onClick={() => setShowCreateColumn(true)}
                    >
                      <PlusIcon className="mr-2 h-5 w-5" />
                      Ajouter une colonne
                    </Button>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BoardPage;
