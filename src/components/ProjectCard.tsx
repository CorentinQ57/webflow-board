
import React from "react";
import { Link } from "react-router-dom";
import { Project } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/board/${project.id}`} className="block">
      <Card className="h-full overflow-hidden card-hover focus-ring">
        {project.coverImage ? (
          <div className="relative h-40 w-full overflow-hidden">
            <img 
              src={project.coverImage} 
              alt={project.title} 
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {project.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        
        <CardHeader className="py-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
            <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
              Site web
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-1">
            {project.description}
          </CardDescription>
        </CardHeader>
        
        <CardFooter className="py-3 border-t text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(project.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>Modifié {formatDate(project.updatedAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
