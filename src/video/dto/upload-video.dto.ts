import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class UploadVideoDto {
    @ApiProperty()
    @IsString()
    titulo: string;

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    tiempo: number;

    @ApiProperty()
    @IsString()
    id_curso: string;
}