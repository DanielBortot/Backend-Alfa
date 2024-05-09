import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Video])
  ],
  controllers: [VideoController],
  providers: [VideoService, CloudinaryProvider],
  exports: [CloudinaryProvider, VideoService]
})
export class VideoModule {}
