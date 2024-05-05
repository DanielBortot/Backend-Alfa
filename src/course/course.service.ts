import { Injectable } from '@nestjs/common';
import { newCourseDto } from './dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categoryPlaceholder.entity';
import { Video } from './entities/videoPlaceholder.entity';

@Injectable()
export class CourseService {
  private readonly courses: Repository<Course>;
  private readonly categories: Repository<Category>;
  private readonly videos: Repository<Video>;

  constructor(@InjectRepository(Course) courses: Repository<Course>, 
              @InjectRepository(Category) categories: Repository<Category>,
              @InjectRepository(Video) videos: Repository<Video>) {
    this.courses = courses;
    this.categories = categories;
    this.videos = videos;
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

  async addVideo(courseId: string, videoId: string): Promise<Course> {
    let course:Course = await this.courses.findOneBy({id : courseId});
    let video:Video = await this.videos.findOneBy({id: videoId})

    if (course === null) {
      return null;
    }
    if (video === null) {
      return null;
    }
    if (video.course !== undefined) {
      return null;
    }
    
    if (course.videos === undefined) {
      course.videos = [];
    }

    course.videos.push(video);
    course.minutes += video.time;

    return this.courses.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courses.find()
  }

  findById(idToFind: string): Promise<Course> {
    return this.courses.findOneBy({id: idToFind});
  }
}
