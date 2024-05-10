import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewCourseDto as NewCourseDto } from '../../application/dto/newCourse.Dto';
import { CourseService } from '../../application/services/course.service';
import { CourseEntity } from '../entities/course.entity';
import { AddVideoDto} from 'src/course/application/dto/addVideo.Dto';
import { SetImageDto} from 'src/course/application/dto/setImage.Dto';


ApiTags("Course")
@Controller('course')
export class CourseController {

  constructor(private readonly courseService:CourseService){}

  @Post("")
  createNewCourse(@Body() newCourseDto: NewCourseDto): Promise<CourseEntity> {
    return this.courseService.createNewCourse(newCourseDto);
  }

  @Patch("/video")
  addVideoToCourse(@Body() addVideoDto: AddVideoDto): Promise<CourseEntity> {
    return this.courseService.addVideo(addVideoDto);
  }

  @Patch("/image")
  setCourseImage(@Body() setImageDto: SetImageDto): Promise<CourseEntity> {
    return this.courseService.setImage(setImageDto);
  }

  @Get("all")
  getAllCourses():Promise<CourseEntity[]> {
    return this.courseService.findAll();
  }
  
  @Get(":id")
  getCourseById(@Param('id') id: string):Promise<CourseEntity> {
    return this.courseService.findById(id);
  }

  @Get("category/:id")
  getCoursesByCategory(@Param("id") categoryId:string): Promise<CourseEntity[]> {
    return this.courseService.findByCategory(categoryId);
  }

  @Get("level/:level")
  getCoursesByLevel(@Param("level") level: string):Promise<CourseEntity[]> {
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
