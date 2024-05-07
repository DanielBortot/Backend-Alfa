import { ComentaryEntity } from "src/post/infrastructure/entities/comentary.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column('varchar', {length: 30})
    name: string

    @Column('varchar', {length: 11})
    phone: string;

    @OneToMany(
        () => ComentaryEntity,  comentary => comentary.user
    )
    comentaries: string[]

}
