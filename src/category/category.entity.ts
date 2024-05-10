/* eslint-disable prettier/prettier */
import { CourseEntity } from "src/course/infrastructure/entities/course.entity";
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

    @OneToOne(() => Image, image => image.id)
    @JoinColumn({name: 'icon_id'})
    icon: Image;

    @OneToMany(type => CourseEntity, course => course.category)
    courses: CourseEntity[];
}