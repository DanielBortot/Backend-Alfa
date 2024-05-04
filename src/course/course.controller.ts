import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { newCourseDto } from './dto/newCourse.Dto';


ApiTags("Course")
@Controller('course')
export class CourseController {

  @Post("")
  createNewCourse(@Body() newCourseDto:newCourseDto):void {
    
  }
  
}
