import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComentaryEntity } from './comentary.entity';
import { PostTagEntity } from "./post_tag.entity";
import { Image } from "src/image/domain/image.entity";

@Entity('post')
export class PostsEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text'})
    description: string;

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

    @OneToOne(
        () => Image, image => image.id
    )
    @JoinColumn({name: 'id_imagen'})
    imageURL: Image; 
}