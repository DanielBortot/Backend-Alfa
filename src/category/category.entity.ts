/* eslint-disable prettier/prettier */
import { Course } from "src/course/domain/course.entity";
import { Image } from "src/image/domain/image.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    description:string;

    @OneToOne(type => Image)
    @JoinColumn()
    icon: Image;

    @OneToMany(type => Course, course => course.category)
    courses: Course[];
}