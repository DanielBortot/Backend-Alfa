import { Controller, Post, Body, Get, Param, Delete, Patch} from '@nestjs/common';
import { createNotificaciondto } from './dto/create-notificacion.dto';
import { NotifyService } from './notify.service';
import { notificacion } from './notify.entity';
import { updateNotificaciondto } from './dto/update-notificacion';


@Controller('notify')
export class NotifyController {

    constructor(private notificacionservice: NotifyService ){}

    @Post()
    createNotificacion(@Body() notificacion: createNotificaciondto){
        return this.notificacionservice.createNotificacion(notificacion);
    }

    @Get()
    getNotificaciones(): Promise<notificacion[]>{
        return this.notificacionservice.getNotificaciones();
    }

    @Get(':id')
    getNotificacion(@Param('id')id: string): Promise<notificacion>{
        return this.notificacionservice.getNotificacion(id);
    }

    @Delete(':id')
        deleteNotificacion(@Param('id')id: string){
            return this.notificacionservice.deleteNotificacion(id);
        }
        
    @Patch(':id')
    updateNotificacion(@Param('id')id: string, @Body() notificacion: updateNotificaciondto){
        return this.notificacionservice.updateNotificacion(id, notificacion);
    }

    @Delete()
    deleteAllNotificaciones() {
    return this.notificacionservice.deleteAllNotificaciones();
  }
}
