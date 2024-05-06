import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from './posts.entity';


@Entity('comentary')
export class ComentaryEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column({ type: 'text'})
    description: string;

    @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    publication_date: Date;

    @ManyToOne(
        () => User,  user => user.id
    )
    user: string;

    @ManyToOne(
        () => PostsEntity, post => post.id
    )
    post: string; 

}