import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VideoP } from "./videoPlaceholder.entity";
import { Image } from "src/image/domain/image.entity";
import { CategoryP } from "./categoryPlaceholder.entity";
import { Video } from "src/video/entities/video.entity";


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

  @ManyToOne(type => CategoryP, category => category.courses)
  category:CategoryP;

  @OneToMany(type => Video, video => video.id_curso)
  videos: Video[]
}