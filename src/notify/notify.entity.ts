import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('notificacion')
export  class notificacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    contenido: string;

    @Column({type:'date', default: () => 'CURRENT_TIMESTAMP'})
    hora_envio: Date;

    @Column()
    leida: boolean;
    
    @Column()
    id_usuario: string;
}
