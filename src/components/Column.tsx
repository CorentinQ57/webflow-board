
import React, { useState } from "react";
import { Column as ColumnType, Task } from "@/lib/types";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  onAddTask: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, onAddTask }) => {
  return (
    <div className="flex flex-col h-full w-80 min-w-80 rounded-md bg-secondary/50 backdrop-blur-sm">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm">
            {column.title}
          </h3>
          <div className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
            {column.tasks.length}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => onAddTask(column.id)}
          >
            <Plus size={16} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Renommer</DropdownMenuItem>
              <DropdownMenuItem>Ajouter une tâche</DropdownMenuItem>
              <DropdownMenuItem>Déplacer la colonne</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex-1 p-2 overflow-y-auto overflow-x-hidden">
        {column.tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      
      <div className="p-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask(column.id)}
        >
          <Plus size={16} className="mr-2" />
          Ajouter une tâche
        </Button>
      </div>
    </div>
  );
};

export default Column;
