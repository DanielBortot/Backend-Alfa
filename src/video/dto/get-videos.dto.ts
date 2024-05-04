import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetVideosDto {
    @ApiProperty()
    @IsString()
    id_curso: string;
}