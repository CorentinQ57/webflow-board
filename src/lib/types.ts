
export interface Project {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
  owner_id: string;
  members: ProjectMember[];
}

export interface ProjectMember {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  email: string;
  invitation_accepted: boolean;
  invited_at: string;
}

export interface Board {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  columns?: Column[]; // Ajout d'une propriété optionnelle pour les colonnes
}

export interface Column {
  id: string;
  board_id: string;
  title: string;
  order: number;
  created_at: string;
  updated_at: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  assignees: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  project_id: string;
  created_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
