
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Mail, Copy, CheckCircle, UserPlus } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

// Données fictives pour les invitations
const mockInvitations = [
  { 
    id: "1", 
    email: "client1@exemple.fr", 
    status: "en attente", 
    sentAt: new Date(2023, 9, 15),
    projects: ["Site E-commerce Maison Luxe"] 
  },
  { 
    id: "2", 
    email: "client2@exemple.fr", 
    status: "accepté", 
    sentAt: new Date(2023, 8, 20),
    projects: ["Portfolio Photographe Paris", "Blog Mode & Lifestyle"] 
  },
  { 
    id: "3", 
    email: "client3@exemple.fr", 
    status: "en attente", 
    sentAt: new Date(2023, 10, 5),
    projects: ["Application Web Réservation Restaurant"] 
  },
];

const ClientsPage = () => {
  const { user } = useUser();
  const [invitations, setInvitations] = useState(mockInvitations);
  const [newInvitation, setNewInvitation] = useState({ email: "", projectId: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleInviteClient = () => {
    if (!newInvitation.email) return;
    
    // Simuler l'ajout d'une nouvelle invitation
    const invitation = {
      id: `${invitations.length + 1}`,
      email: newInvitation.email,
      status: "en attente",
      sentAt: new Date(),
      projects: ["Nouveau projet"]
    };
    
    setInvitations([invitation, ...invitations]);
    setNewInvitation({ email: "", projectId: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Invitation envoyée",
      description: `Une invitation a été envoyée à ${invitation.email}`,
    });
  };

  const copyInviteLink = () => {
    // Simuler la copie d'un lien d'invitation
    navigator.clipboard.writeText(`https://webprojects.app/invitation/123456`);
    setIsCopied(true);
    
    setTimeout(() => setIsCopied(false), 2000);
    
    toast({
      title: "Lien d'invitation copié",
      description: "Vous pouvez maintenant partager ce lien avec votre client",
    });
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
              Gestion des clients
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Invitez vos clients à accéder à leurs projets et gérez leurs permissions.
            </motion.p>
          </header>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Invitations</h2>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus size={16} className="mr-2" />
                  Inviter un client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inviter un nouveau client</DialogTitle>
                  <DialogDescription>
                    Envoyez une invitation à votre client pour lui donner accès au projet.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                      id="email"
                      placeholder="client@exemple.fr"
                      value={newInvitation.email}
                      onChange={(e) => setNewInvitation({ ...newInvitation, email: e.target.value })}
                    />
                  </div>
                  
                  {/* Ici on pourrait ajouter un sélecteur de projets à associer */}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleInviteClient}>
                    Envoyer l'invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-card border rounded-md mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'envoi</TableHead>
                  <TableHead>Projets associés</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-muted-foreground" />
                        {invitation.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invitation.status === "accepté" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}>
                        {invitation.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {invitation.sentAt.toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>
                      {invitation.projects.join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={copyInviteLink}>
                            <Copy size={14} className="mr-2" />
                            Copier le lien
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail size={14} className="mr-2" />
                            Renvoyer l'invitation
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Supprimer l'invitation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6 border">
            <h3 className="text-lg font-semibold mb-2">Partage de projets simplifié</h3>
            <p className="text-muted-foreground mb-4">
              Vous pouvez également générer un lien d'invitation unique pour partager avec vos clients.
              Ce lien leur permettra de s'inscrire et d'accéder directement à leurs projets.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={copyInviteLink} className="gap-2">
                {isCopied ? (
                  <>
                    <CheckCircle size={16} className="text-green-500" />
                    Lien copié
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copier le lien d'invitation
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ClientsPage;
