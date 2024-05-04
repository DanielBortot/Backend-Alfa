import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  Url: string;

  @Column()
  time: number;

  @ManyToOne(type => Course, course => course.videos)
  course: Course;
}