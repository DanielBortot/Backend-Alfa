import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseUUIDPipe } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetVideosDto } from './dto/get-videos.dto';
import { UploadVideoDto } from './dto/upload-video.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: {type: 'string'},
        tiempo: {type: 'integer'},
        id_curso: {type: 'string'},
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({fileType: '.mp4'})
        ]
      }),
    ) file: Express.Multer.File, @Body() info: UploadVideoDto) {
      return this.videoService.uploadFile(file, info)
  }

  @Post('getVideos') //? Post o Get?
  getVideos(@Body() curso: GetVideosDto) {
    return this.videoService.getVideos(curso);
  }

  @Delete('delVideo/:id')
  deleteVideo(@Param('id', ParseUUIDPipe) id: string) {
    return this.videoService.deleteVideo(id)
  }
}
