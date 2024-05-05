import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { newCourseDto } from './dto/newCourse.Dto';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';


ApiTags("Course")
@Controller('course')
export class CourseController {

  constructor(private readonly courseService:CourseService){}

  @Post("")
  createNewCourse(@Body() newCourseDto:newCourseDto): Promise<Course> {
    return this.courseService.createNewCourse(newCourseDto);
  }

  @Patch(":courseId/video/:videoId")
  addVideoToCourse(@Param('courseId') courseId: string, @Param('videoId') videoId: string): Promise<Course> {
    return this.courseService.addVideo(courseId, videoId);
  }

  @Patch(":courseId/image/:imageId")
  setCourseImage(@Param("courseId") courseId: string, @Param('imageId') imageId: string): Promise<Course> {
    return this.courseService.setImage(courseId, imageId);
  }

  @Get("all")
  getAllCourses():Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(":id")
  getCourseById(@Param('id') id: string):Promise<Course> {
    return this.courseService.findById(id);
  }

  @Get("category/:id")
  getCoursesByCategory(@Param("id") categoryId:string): Promise<Course[]> {
    return this.courseService.findByCategory(categoryId);
  }

  @Get("level/:level")
  getCoursesByLevel(@Param("level") level: string):Promise<Course[]> {
    return this.courseService.findByLevel(level);
  }

  @Delete(":id")
  deleteCourseById(@Param("id") id:string):void {
    this.courseService.deleteById(id);
  }

  @Delete("category/:id")
  deleteCoursesByCategory(@Param("id") categoryId: string): void {
    this.courseService.deleteByCategory(categoryId);
  }
} 
