import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  iconURL: string;
  
  @ManyToOne(type => Course, course => course.category)
  courses: Course[];
}