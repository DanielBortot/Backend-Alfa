import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComentaryEntity } from './comentary.entity';
import { PostTagEntity } from "./post_tag.entity";

@Entity('posts')
export class PostsEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text'})
    description: string;
    
    @Column({type: 'text'})
    imageURL: string; 

    @Column({type: 'date'})
    publication_date: Date;

    @OneToMany(
        () => PostTagEntity, post_tag => post_tag.post
    )
    post_tag: PostTagEntity[];

    @OneToMany(
        () => ComentaryEntity,  comentary => comentary.post
    )
    comentaries: ComentaryEntity[]
}