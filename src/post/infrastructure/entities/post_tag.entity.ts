import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";
import { TagEntity } from './tag.entity';

@Entity('post_tag')     
export class PostTagEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @ManyToOne(
        () => TagEntity, tag => tag.post_tags
    )
    tag: TagEntity;

    @ManyToOne(
        () => PostsEntity, post => post.post_tag
    )
    post: PostsEntity;
}