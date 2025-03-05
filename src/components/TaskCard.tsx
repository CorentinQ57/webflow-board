
import React from "react";
import { motion } from "framer-motion";
import { Task } from "@/lib/types";
import { Calendar, Clock, Paperclip, MessageSquare } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskCardProps {
  task: Task;
}

const formatDate = (date: Date | undefined): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(date);
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Mock data for demo purposes
  const commentsCount = 3;
  const attachmentsCount = 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 cursor-pointer hover:shadow-md transition-all focus-ring">
        {task.coverImage && (
          <div className="h-32 w-full overflow-hidden">
            <img
              src={task.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-3">
          <h3 className="font-medium text-sm mb-2">{task.title}</h3>
          
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {task.tags.map(tag => (
                <Badge
                  key={tag.id}
                  style={{ backgroundColor: tag.color + "20", color: tag.color }}
                  className="text-[10px] px-1.5 py-0 font-normal rounded-sm"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {task.dueDate && (
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {attachmentsCount > 0 && (
              <div className="flex items-center">
                <Paperclip size={12} className="mr-1" />
                <span>{attachmentsCount}</span>
              </div>
            )}
            
            {commentsCount > 0 && (
              <div className="flex items-center">
                <MessageSquare size={12} className="mr-1" />
                <span>{commentsCount}</span>
              </div>
            )}
            
            {task.assignees && task.assignees.length > 0 && (
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((assignee, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-background">
                    <AvatarFallback className="text-[10px]">
                      {assignee.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.assignees.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] border-2 border-background">
                    +{task.assignees.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
