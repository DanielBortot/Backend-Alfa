import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Followers } from "./followers.entity";
import { Image } from "src/image/domain/image.entity";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column('varchar',{length: 30})
    name: string;

    @Column('varchar',{length: 11})
    phone: string;

    @ManyToOne(
        () => Image,
        image => image.id
    )
    @JoinColumn({name: 'image_id'})
    image: Image;

    //! Este es followers
    @OneToMany( // Este es el IdUser
        () => Followers,
        ( follower ) => follower.userByIdUser,
        { cascade: true, eager: true}
    )
    IdUser: Followers[];

    @OneToMany( // Este es el IdFollower
        () => Followers,
        ( follower ) => follower.userByIdFollower,
        { cascade: true, eager: true}
    )
    IdFollower: Followers[];
    //!
}
