import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateFollowerDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    idUser?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    idFollower?: string;

}
