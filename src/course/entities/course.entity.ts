import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./videoPlaceholder.entity";
import { Category } from "./categoryPlaceholder.entity";
import { Image } from "./imagePlaceholder.entity";


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

  @OneToOne(type => Image)
  @JoinColumn()
  image:Image;

  @ManyToOne(type => Category, category => category.courses)
  category:Category;

  @OneToMany(type => Video, video => video.course)
  videos: Video[];
}