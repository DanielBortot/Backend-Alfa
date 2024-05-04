import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetVideosDto } from './dto/get-videos.dto';
import { UploadVideoDto } from './dto/upload-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

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

  @Post('getVideos')
  getVideos(@Body() curso: GetVideosDto) {
    return this.videoService.getVideos(curso);
  }
}
