import { Module } from '@nestjs/common';
import { CourseController } from './infrastructure/controller/course.controller';
import { CourseService } from './application/services/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './domain/course.entity';
import { VideoP } from './domain/videoPlaceholder.entity';
import { Image } from 'src/image/domain/image.entity';
import { CategoryP } from './domain/categoryPlaceholder.entity';
import { ImageP } from './domain/imagePlaceholder.entity';
import { Video } from 'src/video/entities/video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CategoryP, Video, Image])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
