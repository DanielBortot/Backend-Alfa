import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("image")
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  public_id: string;
}