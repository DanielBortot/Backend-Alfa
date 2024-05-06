import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class NewCourseDto {
  @ApiProperty()
  @IsString()
  name:string;

  @ApiProperty()
  @IsString()
  description:string;

  @ApiProperty()
  @IsString()
  level:string;

  @ApiProperty()
  @IsNumber()
  weeks:number;

  @ApiProperty()
  @IsString()
  categoryId: string;

  

  //? Considero que al crear un curso este debe estar vacío
  //? Los videos deberían añadirse uno por uno y los minutos se irán actualizando
  // @ApiProperty()
  // @IsNumber()
  // minutes:number;
}