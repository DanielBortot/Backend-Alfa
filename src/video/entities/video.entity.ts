import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('video')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  titulo: string;

  @Column('varchar')
  url: string;

  @Column()
  tiempo: number;

  @Column() //? Creo que sería bueno añadir las relaciones a curso por este lado, y añadirle un OnDelete: Cascade
  id_curso: string;

  @Column()
  public_id: string;
}
