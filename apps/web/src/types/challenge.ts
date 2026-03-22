export type Challenge = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  is_active: boolean;
  author?: string;
  file_url?: string;
  external_url?: string;
  created_at?: string;
  updated_at?: string;
};