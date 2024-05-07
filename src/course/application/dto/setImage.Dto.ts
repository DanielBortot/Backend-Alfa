import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SetImageDto {
  @ApiProperty()
  @IsString()
  courseId: string;
  
  @ApiProperty()
  @IsString()
  imageId: string;
}