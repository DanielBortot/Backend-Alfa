import { IsArray, IsEmail, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    phone: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string;
    
    @IsString()
    images:string;
    
    @IsString({ each: true })
    @IsArray()
    followers: string[];

    @IsString({ each: true })
    @IsArray()
    followings: string[];

}
