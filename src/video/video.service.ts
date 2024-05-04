import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IVideoProvider } from './interfaces/video.IVideoProvider';
import { CloudinaryService } from './implementations/video.cloudinaryService';
import { GetVideosDto } from './dto/get-videos.dto';
import { IDatabaseConnection } from './interfaces/video.IDataBaseConnection';
import { PgVideo } from './implementations/video.pgVideo';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadVideoDto } from './dto/upload-video.dto';

@Injectable()
export class VideoService {
  private videoDB: Repository<Video>
  private video: IVideoProvider;
  private videoManager: IDatabaseConnection;

  constructor(@InjectRepository(Video) videoDB) {
    this.videoDB = videoDB;
    this.video = new CloudinaryService();
    this.videoManager = new PgVideo(this.videoDB);
  }
  
  async uploadFile(file: Express.Multer.File, info: UploadVideoDto) {
    const {url, public_id} = await this.video.uploadFile(file);
    return this.videoManager.uploadVideo(info, url, public_id);
  }

  getVideos(curso: GetVideosDto) {
    return this.videoManager.getVideos(curso);
  }

  async deleteVideo(id: string) {

    try {
      const {public_id} = await this.videoManager.deleteVideo(id);
      await this.video.deleteFile(public_id);
    } catch (e) {
      throw new HttpException('No existe el video', HttpStatus.BAD_REQUEST);
    }
  }

}
