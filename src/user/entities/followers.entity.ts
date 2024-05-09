import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity('followers')
export class Followers {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    follower_id: string;

    @ManyToOne( // Este es el IdUser
        () => User,
        ( user ) => user.IdUser,      
    )
    @JoinColumn({name: 'user_id'})
    userByIdUser: User; //userByidUserID

    @ManyToOne( // Este es el IdFollower
        () => User,
        ( user ) => user.IdFollower,      
    )
    @JoinColumn({name: 'follower_id'})
    userByIdFollower: User;

}
