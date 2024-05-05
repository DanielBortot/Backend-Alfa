import { Injectable } from '@nestjs/common';
import { newCourseDto } from './dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categoryPlaceholder.entity';

@Injectable()
export class CourseService {
  private readonly courses: Repository<Course>;
  private readonly categories: Repository<Category>;

  constructor(@InjectRepository(Course) courses: Repository<Course>, 
              @InjectRepository(Category) categories: Repository<Category>) {
    this.courses = courses;
    this.categories = categories;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  async createNewCourse(newCourseDto: newCourseDto): Promise<Course> {
    
    let newCourse:Course = new Course();
    newCourse.name = newCourseDto.name;
    newCourse.category = await this.categories.findOneBy({id : newCourseDto.categoryId})
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;
    newCourse.minutes = 0;

    return this.courses.save(newCourse);
  }

  findAll(): Promise<Course[]> {
    return this.courses.find()
  }
}
