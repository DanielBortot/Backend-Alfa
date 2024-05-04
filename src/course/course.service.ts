import { Injectable } from '@nestjs/common';
import { newCourseDto } from './dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CourseService {
  private readonly courses: Repository<Course>;

  constructor(@InjectRepository(Course) courses: Repository<Course>) {
    this.courses = courses;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  createNewCourse(newCourseDto: newCourseDto): Promise<Course> {
    let newCourse:Course = new Course();
    newCourse.name = newCourseDto.name;
    newCourse.category = newCourseDto.category;
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;

    return this.courses.save(newCourse);
  }

  findAll(): Promise<Course[]> {
    return this.courses.find()
  }
}
