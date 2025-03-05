
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  // Fonction pour formater les dates
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-card border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all h-full flex flex-col",
        className
      )}
    >
      <div className="aspect-video bg-muted relative">
        {project.cover_image ? (
          <img
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/40">
              {project.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-medium mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description || "Aucune description"}
        </p>
        <div className="mt-auto space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>
              {project.members.length} {project.members.length > 1 ? "membres" : "membre"}
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Créé {formatDate(project.created_at)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>Mis à jour {formatDate(project.updated_at)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
