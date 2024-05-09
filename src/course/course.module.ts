import { Module } from '@nestjs/common';
import { CourseController } from './infrastructure/controller/course.controller';
import { CourseService } from './application/services/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './domain/course.entity';
import { Image } from 'src/image/domain/image.entity';
import { Video } from 'src/video/entities/video.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Category, Video, Image])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
