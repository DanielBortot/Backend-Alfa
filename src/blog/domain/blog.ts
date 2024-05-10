import { Category } from 'src/category/category.entity';
import { Image } from 'src/image/domain/image.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'id_imagen' })
  id_imagen: Image;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'id_category' })
  id_category: Category;
}
