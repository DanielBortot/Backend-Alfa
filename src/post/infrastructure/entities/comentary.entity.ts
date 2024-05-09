import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PostsEntity } from './posts.entity';


@Entity('comentary')
export class ComentaryEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string 

    @Column({ type: 'text'})
    description: string;

    @Column({type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    publication_date: Date;

    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    post_id: string;

    @ManyToOne(
        () => User,  user => user.id
    )
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(
        () => PostsEntity, post => post.id
    )
    @JoinColumn({name: 'post_id'})
    post: PostsEntity; 

} 