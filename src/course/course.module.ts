import { Module } from '@nestjs/common';
import { CourseController } from './infrastructure/controller/course.controller';
import { CourseService } from './application/services/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './domain/course.entity';
import { Category } from './domain/categoryPlaceholder.entity';
import { Video } from './domain/videoPlaceholder.entity';
import { Image } from './domain/imagePlaceholder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Category, Video, Image])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
