import { Controller, Post, Body, Get, Param, Delete, Patch, ParseUUIDPipe} from '@nestjs/common';
import { createNotificaciondto } from './dto/create-notificacion.dto';
import { NotifyService } from './notify.service';
import { notificacion } from './notify.entity';
import { updateNotificaciondto } from './dto/update-notificacion';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notify')
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
    getNotificacion(@Param('id', ParseUUIDPipe) id: string): Promise<notificacion>{
        return this.notificacionservice.getNotificacion(id);
    }

    @Delete(':id')
        deleteNotificacion(@Param('id', ParseUUIDPipe) id: string){
            return this.notificacionservice.deleteNotificacion(id);
        }
        
    @Patch(':id')
    updateNotificacion(@Param('id', ParseUUIDPipe)id: string, @Body() notificacion: updateNotificaciondto){
        return this.notificacionservice.updateNotificacion(id, notificacion);
    }

    @Delete()
    deleteAllNotificaciones() {
    return this.notificacionservice.deleteAllNotificaciones();
  }
}
