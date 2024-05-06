import { Injectable } from '@nestjs/common';
import { NewCourseDto } from '../dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { Course } from '../../domain/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../domain/categoryPlaceholder.entity';
import { Video } from '../../domain/videoPlaceholder.entity';
import { Image } from '../../domain/imagePlaceholder.entity';
import { AddVideoDto } from '../dto/addVideo.Dto';
import { SetImageDto } from '../dto/setImage.Dto';

@Injectable()
export class CourseService {
  private readonly courses: Repository<Course>;
  private readonly categories: Repository<Category>;
  private readonly videos: Repository<Video>;
  private readonly images: Repository<Image>;

  constructor(@InjectRepository(Course) courses: Repository<Course>, 
              @InjectRepository(Category) categories: Repository<Category>,
              @InjectRepository(Video) videos: Repository<Video>,
              @InjectRepository(Image) images: Repository<Image>) {
    this.courses = courses;
    this.categories = categories;
    this.videos = videos;
    this.images = images;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  async createNewCourse(newCourseDto: NewCourseDto): Promise<Course> {
    
    let newCourse:Course = new Course();
    newCourse.name = newCourseDto.name;
    newCourse.category = await this.categories.findOneBy({id : newCourseDto.categoryId})
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;
    newCourse.minutes = 0;

    return this.courses.save(newCourse);
  }

  async addVideo(addVideoDto: AddVideoDto): Promise<Course> {
    let course:Course = await this.courses.findOneBy({id : addVideoDto.courseId});
    let video:Video = await this.videos.findOneBy({id: addVideoDto.videoId})

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

  async setImage(setImageDto: SetImageDto) {
    let course: Course = await this.courses.findOneBy({ id : setImageDto.courseId});
    let image: Image = await this.images.findOneBy({ id : setImageDto.imageId});

    if (course === null) {
      return null;
    }
    if (image === null) {
      return null;
    }

    course.image = image;

    return this.courses.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courses.find()
  }

  findById(idToFind: string): Promise<Course> {
    return this.courses.findOneBy({id: idToFind});
  }

  async findByCategory(categoryId: string): Promise<Course[]> {
    let categoryToFind: Category = await this.categories.findOneBy({id: categoryId});

    if (categoryToFind) {
     return this.courses.findBy({category: categoryToFind});
    }
  }

  findByLevel(level: string): Promise<Course[]> {
    return this.courses.findBy({level: level});
  }

  deleteById(idToDelete: string): void {
    this.courses.delete({id: idToDelete});
  }

  async deleteByCategory(categoryId: string): Promise<void> {
    let category: Category = await this.categories.findOneBy({id: categoryId});
    
    if (category) {
      this.courses.delete({category: category});
    }
  }

}
