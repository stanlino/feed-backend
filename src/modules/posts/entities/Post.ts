export interface Post {
  id: string;
  user_id: string;
  text: string | null;
  image: string | null;
  balance: number;
  created_at: Date;
}
