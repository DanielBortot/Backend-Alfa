import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  titulo: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: Date;

  @BeforeInsert()
  beforeInsert() {
    this.fecha = new Date();
  }

  @Column('varchar')
  descripcion: string;

  @Column('varchar')
  id_imagen: string;

  @Column('varchar')
  id_category: string;
}
