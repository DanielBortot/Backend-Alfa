import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("imagePlaceholder")
export class ImageP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

}