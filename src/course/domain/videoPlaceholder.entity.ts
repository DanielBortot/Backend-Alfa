import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity("videoPlaceholder")
export class VideoP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  time: number;

  @ManyToOne(type => Course, course => course.videos, {onDelete: "CASCADE"})
  course: Course;
}