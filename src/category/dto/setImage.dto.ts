import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SetImageDto {
  @ApiProperty()
  @IsString()
  categoryId: string;
  
  @ApiProperty()
  @IsString()
  imageId: string;
}