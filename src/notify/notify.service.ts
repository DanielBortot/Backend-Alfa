import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notificacion } from './notify.entity';
import { Repository } from 'typeorm';
import { createNotificaciondto } from './dto/create-notificacion.dto';
import { updateNotificaciondto } from './dto/update-notificacion';



@Injectable()
export class NotifyService {

    constructor(@InjectRepository(notificacion)  private notificacionRepository: Repository<notificacion>){}

    createNotificacion(notificacion: createNotificaciondto){
        const notification = {
            leida: false,
            ...notificacion,
        }
        const newNotificacion = this.notificacionRepository.create(notification);
        return this.notificacionRepository.save(newNotificacion);  
    }

    getNotificaciones(){
        return this.notificacionRepository.find();
    }

    getNotificacion(id: string){
        return this.notificacionRepository.findOne({
            where: {id}
        });
    }

    deleteNotificacion(id: string){
        return this.notificacionRepository.delete({id});
    }

    updateNotificacion(id: string, notificacion: updateNotificaciondto){
        const notificacionUpdate = {
            leida: true,
            ...notificacion,
        }
        return this.notificacionRepository.update({id}, notificacionUpdate);
    } 
    
    deleteAllNotificaciones() {
        return this.notificacionRepository.clear();
    }
 
    
}
