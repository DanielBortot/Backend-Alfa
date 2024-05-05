import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { newCourseDto } from './dto/newCourse.Dto';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categoryPlaceholder.entity';
import { Repository } from 'typeorm';


ApiTags("Course")
@Controller('course')
export class CourseController {

  constructor(private readonly courseService:CourseService){}

  @Post("")
  createNewCourse(@Body() newCourseDto:newCourseDto): Promise<Course> {
    return this.courseService.createNewCourse(newCourseDto);
  }

  @Get("courses")
  findAllCourses():Promise<Course[]> {
    return this.courseService.findAll();
  }


}
