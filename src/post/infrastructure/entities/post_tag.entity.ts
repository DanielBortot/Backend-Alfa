import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";
import { TagEntity } from './tag.entity';

@Entity('post_tag')     
export class PostTagEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    tag_id: string;

    @PrimaryColumn()
    post_id: string;

    @ManyToOne(
        () => TagEntity, tag => tag.post_tags
    )
    @JoinColumn({name: 'tag_id'})
    tag: TagEntity;

    @ManyToOne(
        () => PostsEntity, post => post.post_tag
    )
    @JoinColumn({name: 'post_id'})
    post: PostsEntity;
}