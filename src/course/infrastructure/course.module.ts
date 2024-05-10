import { Module } from '@nestjs/common';
import { CourseController } from './controller/course.controller';
import { CourseService } from '../application/services/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { Image } from 'src/image/domain/image.entity';
import { Video } from 'src/video/entities/video.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseEntity, Category, Video, Image])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
