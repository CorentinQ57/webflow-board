
export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  coverImage?: string;
  tags: Tag[];
  assignees?: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
