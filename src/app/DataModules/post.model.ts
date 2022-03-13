export interface Post {
  id: string;
  user: string;
  userName: string;
  postContent: string;
  comments: Array<any>;
  totalLikes: number;
  created: string;
  likes: Array<any>;
}
