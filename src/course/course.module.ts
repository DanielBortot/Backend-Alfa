import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Category } from './entities/categoryPlaceholder.entity';
import { Video } from './entities/videoPlaceholder.entity';
import { Image } from './entities/imagePlaceholder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Category, Video, Image])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
