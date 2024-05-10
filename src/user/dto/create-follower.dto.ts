import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateFollowerDto {

    @ApiProperty()
    @IsString()
    idUser: string;

    @ApiProperty()
    @IsString()
    idFollower: string;

}
