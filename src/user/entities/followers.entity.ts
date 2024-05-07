import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserFF } from "./userFF.entity";


@Entity('followers')
export class Followers {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( // Este es el IdUser
        () => UserFF,
        ( user ) => user.IdUser,      
    )
    userByIdUser: string; //userByidUserID

    @ManyToOne( // Este es el IdFollower
        () => UserFF,
        ( user ) => user.IdFollower,      
    )
    userByIdFollower: string;

}
