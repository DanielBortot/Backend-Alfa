import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VideoP } from "./videoPlaceholder.entity";
import { Image } from "src/image/domain/image.entity";
import { CategoryP } from "./categoryPlaceholder.entity";
import { Video } from "src/video/entities/video.entity";
import { Category } from "src/category/category.entity";


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

  @OneToOne(() => Image, image => image.id)
  @JoinColumn({name: 'id_imagen'})
  image:Image;

  @ManyToOne(() => Category, category => category.courses)
  @JoinColumn({name: 'id_category'})
  category: Category;

  @OneToMany(type => Video, video => video.id_curso)
  videos: Video[]
}