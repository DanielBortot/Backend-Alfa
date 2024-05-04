import { IsString } from "class-validator";

export class GetVideosDto {
    @IsString()
    id_curso: string;
}