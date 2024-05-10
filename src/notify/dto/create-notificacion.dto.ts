import{ IsBoolean, IsString } from "class-validator";


export class createNotificaciondto{

    @IsString()
    contenido: string;

    @IsString()
    id_usuario: string;
}