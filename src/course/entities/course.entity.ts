import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./videoPlaceholder.entity";
import { Category } from "./categoryPlaceholder.entity";


@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  level:string;

  @Column()
  weeks:number;

  @Column()
  minutes:number;

  @ManyToOne(type => Category, category => category.courses)
  category:Category;

  @OneToMany(type => Video, video => video.course)
  videos: Video[];
}