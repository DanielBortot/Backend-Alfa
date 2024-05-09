import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";
import { Image } from "src/image/domain/image.entity";

@Entity("categoryPlaceholder")
export class CategoryP {
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