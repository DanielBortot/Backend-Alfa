import { Comentary } from "./Comentary";

export interface IComentaryRepository {
    findComentariesByPostId(postId: string): Promise<Comentary[]>;
}