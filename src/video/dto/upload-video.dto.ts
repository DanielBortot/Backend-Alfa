import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UploadVideoDto {
    @IsString()
    titulo: string;

    @IsNumber()
    @Type(() => Number)
    tiempo: number;

    @IsString()
    id_curso: string;
}