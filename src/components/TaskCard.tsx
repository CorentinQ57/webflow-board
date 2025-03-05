
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Tag as TagIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task, Tag } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskCardProps {
  task: Task;
  className?: string;
  draggable?: boolean;
}

const TaskCard = ({ task, className, draggable = true }: TaskCardProps) => {
  // Fonction pour formater les dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: fr,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "bg-card border rounded-lg shadow-sm overflow-hidden hover:shadow transition-all",
        className
      )}
      draggable={draggable}
    >
      {task.cover_image && (
        <div className="aspect-video bg-muted">
          <img
            src={task.cover_image}
            alt={task.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <h4 className="font-medium mb-2">{task.title}</h4>
        
        {task.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
        )}
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag: Tag) => (
              <Badge key={tag.id} style={{ backgroundColor: tag.color }} variant="outline" className="text-[9px]">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          {task.due_date && (
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{formatDate(task.due_date)}</span>
            </div>
          )}
          
          {task.assignees && task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.slice(0, 3).map((assignee, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${assignee}`} />
                  <AvatarFallback className="text-[10px]">
                    {assignee.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length > 3 && (
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-[10px] bg-muted">
                    +{task.assignees.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
