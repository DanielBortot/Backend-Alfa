import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetVideosDto {
    @ApiProperty()
    @IsUUID()
    id_curso: string;
}