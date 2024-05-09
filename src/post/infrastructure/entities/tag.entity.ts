import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from "./posts.entity";
import { PostTagEntity } from "./post_tag.entity";


@Entity('tag')
export class TagEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({type: 'text'})
    name: string;

    @OneToMany(
        () => PostTagEntity, post_tag => post_tag.tag
    )
    post_tags: PostTagEntity[];

}