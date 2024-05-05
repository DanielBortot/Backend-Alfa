import { IPostRepository } from "src/post/domain/IPost.repository";
import { Post } from "src/post/domain/Post";
import { DataSource, Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";


export class OrmPostRepository extends Repository<PostEntity> implements IPostRepository{
    constructor(database: DataSource){
        super(PostEntity, database.manager)
    }

    async findAllPosts(): Promise<Post[]> {
        try {
            const resp: Post[] = await this.find()
            return resp
        } catch (error) {
            console.log(error)
            throw new Error(`Posts not found.`)
        }

    }
    async findOnePost(id: string): Promise<Post> {
        try {
            const resp: Post = await this.createQueryBuilder("post")
            .leftJoinAndSelect("post.comentaries", "comentaries")
            .where("post.id = :id", { id: id }).getOne()
            return resp

        } catch (error) {
            console.log(error)
            throw new Error(`Post with id ${id} not found.`)
        }
    }

    
}