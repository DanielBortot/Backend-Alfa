import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

   async getNotificacion(id: string){
    const notifyfound = await this.notificacionRepository.findOne({
        where: {id}
    });
         
    if(!notifyfound){
        throw new HttpException('notificacion no encontrada', HttpStatus.NOT_FOUND);
    }
    return notifyfound;
    }

    async deleteNotificacion(id: string){
        const result = await this.notificacionRepository.delete(id);
        if(result.affected === 0){
            throw new HttpException('notificacion no encontrada', HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async updateNotificacion(id: string, notificacion: updateNotificaciondto){
        const notificacionUpdate = {
            leida: true,
            ...notificacion,
        }
        const result = await this.notificacionRepository.update(id, notificacionUpdate);

        if(!result.affected){
            throw new HttpException('notificacion no encontrada', HttpStatus.NOT_FOUND);
        }
        return result;
    } 
    
    deleteAllNotificaciones() {
        return this.notificacionRepository.clear();
    }
 
    
}
