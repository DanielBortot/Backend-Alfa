import { Post } from "./Post";


export interface IPostRepository {
    findAllPosts(): Promise<Post[]>; 

    findOnePost(id: string): Promise<Post>;
}