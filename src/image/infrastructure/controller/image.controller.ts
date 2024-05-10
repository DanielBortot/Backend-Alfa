import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ImageService } from 'src/image/application/services/image.service';
import { Image } from 'src/image/domain/image.entity';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile(
    new ParseFilePipe({
      validators: [new FileTypeValidator({fileType: ".jpg"}),
                  new FileTypeValidator({fileType: ".png"})
      ]
    }),
  ) file: Express.Multer.File) {
    return this.imageService.uploadImage(file);
  }
  
  @Get("all")
  getAllImages(): Promise<Image[]> {
    return this.imageService.getAllImages();
  }

  @Get(':id')
  getImageById(@Param('id', ParseUUIDPipe) id: string): Promise<Image> {
    return this.imageService.getImageById(id);
  }

  @Delete(':id')
  deleteImageById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.imageService.deleteById(id);
  }

}
