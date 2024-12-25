export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  deadline?: string;
  user_id: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  user_id: string;
}