import { Injectable } from '@nestjs/common';
import { NewCourseDto } from '../dto/newCourse.Dto';
import { Repository } from 'typeorm';
import { Course } from '../../domain/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoP } from '../../domain/videoPlaceholder.entity';
import { Image } from 'src/image/domain/image.entity';
import { AddVideoDto } from '../dto/addVideo.Dto';
import { SetImageDto } from '../dto/setImage.Dto';
import { CategoryP } from 'src/course/domain/categoryPlaceholder.entity';
import { Video } from 'src/video/entities/video.entity';

@Injectable()
export class CourseService {
  private readonly courses: Repository<Course>;
  private readonly categories: Repository<CategoryP>;
  private readonly videos: Repository<Video>;
  private readonly images: Repository<Image>;
  //TODO: Arreglar las entidades necesarias para el curso y conectar

  constructor(@InjectRepository(Course) courses: Repository<Course>, 
              @InjectRepository(CategoryP) categories: Repository<CategoryP>,
              @InjectRepository(Video) videos: Repository<Video>,
              @InjectRepository(Image) images: Repository<Image>) {
    this.courses = courses;
    this.categories = categories;
    this.videos = videos;
    this.images = images;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  async createNewCourse(newCourseDto: NewCourseDto): Promise<Course> {
    
    const newCourse:Course = new Course();
    newCourse.name = newCourseDto.name;
    newCourse.category = await this.categories.findOneBy({id : newCourseDto.categoryId})
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;
    newCourse.minutes = 0;
    newCourse.videos = [];
    
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
    if (video.id_curso !== undefined) {
      return null;
    }

    course.videos.push(video);
    course.minutes += video.tiempo;

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
    const categoryToFind: CategoryP = await this.categories.findOneBy({id: categoryId});

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
    const category: CategoryP = await this.categories.findOneBy({id: categoryId});
    
    if (category) {
      this.courses.delete({category: category});
    }
  }

}
