import { Injectable } from '@nestjs/common';
import { NewCourseDto } from '../dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { CourseEntity } from '../../infrastructure/entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/image/domain/image.entity';
import { AddVideoDto } from '../dto/addVideo.Dto';
import { SetImageDto } from '../dto/setImage.Dto';
import { Video } from 'src/video/entities/video.entity';
import { Category } from 'src/category/category.entity';
import { ICourseRepository } from 'src/course/domain/ICourse.repository';
import { Course } from 'src/course/domain/Course';
import { OrmCourseRepository } from 'src/course/infrastructure/repositories/ormCourse.repository';

export class CourseService {
  private readonly courses: OrmCourseRepository;
  private readonly categories: Repository<Category>;
  private readonly videos: Repository<Video>;
  private readonly images: Repository<Image>;

  // constructor(courses: ICourseRepository, 
  //             @InjectRepository(Category) categories: Repository<Category>,
  //             @InjectRepository(Video) videos: Repository<Video>,
  //             @InjectRepository(Image) images: Repository<Image>) {
    constructor(courses: OrmCourseRepository){
    this.courses = courses;
    // this.categories = categories;
    // this.videos = videos;
    // this.images = images;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  async createNewCourse(newCourseDto: NewCourseDto): Promise<Course> {
    
    const newCourse:CourseEntity = new CourseEntity();
    newCourse.name = newCourseDto.name;
    //newCourse.category = await this.categories.findOneBy({id : newCourseDto.categoryId})
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;
    newCourse.minutes = 0;
    newCourse.videos = [];
    
    return this.courses.storeAndSave(newCourse);
  }

//   async addVideo(addVideoDto: AddVideoDto): Promise<Course> {
//     const course:Course = this.courses.getById(addVideoDto.courseId);
//     let video:Video = await this.videos.findOneBy({id: addVideoDto.videoId})

//     if (course === null) {
//       return null;
//     }
//     if (video === null) {
//       return null;
//     }
//     if (video.id_curso !== undefined) {
//       return null;
//     }
    
//     course.videos.push(video);
//     course.minutes += video.tiempo;

//     return this.courses.save(course);
// }

  // async setImage(setImageDto: SetImageDto) {
  //   let course: CourseEntity = await this.courses.findOneBy({ id : setImageDto.courseId});
  //   let image: Image = await this.images.findOneBy({ id : setImageDto.imageId});

  //   if (course === null) {
  //     return null;
  //   }
  //   if (image === null) {
  //     return null;
  //   }

  //   course.image = image;

  //   return this.courses.save(course);
  // }

  findAll(): Promise<CourseEntity[]> {
    return this.courses.getAll();
  }

  findById(idToFind: string): Promise<CourseEntity> {
    return this.courses.getById(idToFind);
  }

  async findByCategory(categoryId: string): Promise<CourseEntity[]> {
    return this.courses.getAllByCategory(categoryId);
  }

  findByLevel(level: string): Promise<Course[]> {
    return this.courses.getAllByLevel(level);
  }

  deleteById(idToDelete: string): void {
    this.courses.deleteById(idToDelete);
  }

  async deleteByCategory(categoryId: string): Promise<void> {
    const category: Category = await this.categories.findOneBy({id: categoryId});
    
    if (category) {
      this.courses.deleteAllByCategory(category);
    }
  }

}
