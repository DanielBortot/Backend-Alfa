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

  @Column()
  id_curso: string;
}
