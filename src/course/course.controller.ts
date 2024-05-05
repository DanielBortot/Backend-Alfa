import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(":courseId/video/:videoId")
  addVideoToCourse(@Param('courseId') courseId: string, @Param('videoId') videoId: string): Promise<Course>{
    return this.courseService.addVideo(courseId, videoId);
  }

  @Get("courses")
  getAllCourses():Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(":id")
  getCourseById(@Param('id') id: string):Promise<Course> {
    return this.courseService.findById(id);
  } 

  @Delete(":id")
  deleteCourseById(@Param("id") id:string):void {
    //TODO: Implementar endpoint para borrar cursos por su ID
  }
} 
