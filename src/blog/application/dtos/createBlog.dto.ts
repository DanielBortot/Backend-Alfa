import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id_imagen: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id_category: string;
}
