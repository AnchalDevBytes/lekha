export interface Author {
    name: string;
}
  
export interface BlogInterface {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: Author;
    publishedAt: string;
}
  
export  interface BlogResponseInterface {
    status: number;
    message: string;
    data: BlogInterface;
}
