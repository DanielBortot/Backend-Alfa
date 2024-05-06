import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { Image } from "./imagePlaceholder.entity";

@Entity("categoryPlaceholder")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(type => Image)
  @JoinColumn()
  Icon: Image;
  
  @OneToMany(type => Course, course => course.category)
  courses: Course[];
}