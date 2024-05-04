import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class newCourseDto {
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
  @IsNumber()
  minutes:number;
}