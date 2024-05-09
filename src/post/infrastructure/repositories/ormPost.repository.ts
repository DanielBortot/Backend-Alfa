import { IPostRepository } from "src/post/domain/IPost.repository";
import { Post } from "src/post/domain/Post";
import { DataSource, Repository } from "typeorm";
import { PostsEntity } from "../entities/posts.entity";
import { PostMapper } from '../mappers/post.mapper';


export class OrmPostRepository extends Repository<PostsEntity> implements IPostRepository{
    constructor(database: DataSource){
        super(PostsEntity, database.manager)
    }

    async findAllPosts(): Promise<Post[]> {
        try {
            const resp = await this.createQueryBuilder('post')
            .leftJoinAndSelect('post.post_tag', 'post_tag')
            .leftJoinAndSelect('post_tag.tag', 'tag')  
            .getMany()
            const posts: Post[] = resp.map((post) => PostMapper.toDomain(post))
            return posts;
        } catch (error) {
            console.log(error)
            throw new Error(`Posts not found.`)
        }
    }


    async findOnePost(id: string): Promise<Post> {
        try {
            const resp = await this.createQueryBuilder("post")
            .leftJoinAndSelect('post.post_tag', 'post_tag')
            .leftJoinAndSelect('post_tag.tag', 'tag')
            .where('post.id = :id', {id})
            .getOne()
            const post: Post = PostMapper.toDomain(resp)
            console.log(post)
            return post
        } catch (error) {
            console.log(error)
            throw new Error(`Post with id ${id} not found.`)
        }
    }

    
}