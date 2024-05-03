import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ComentaryEntity } from './comentary.entity';


@Entity('post')
export class PostEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({type: 'text'})
    description: string;

    @Column({type: 'text'})
    imageURL: string; 

    @Column({type: 'date'})
    publication_date: Date;

    @Column({type: 'text', array: true})
    tags: string[]

    @OneToMany(
        () => ComentaryEntity,  comentary => comentary.post
    )
    comentaries: string[]


}