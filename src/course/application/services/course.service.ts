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

@Injectable()
export class CourseService {
  private readonly courses: Repository<CourseEntity>;
  private readonly categories: Repository<Category>;
  private readonly videos: Repository<Video>;
  private readonly images: Repository<Image>;

  constructor(@InjectRepository(CourseEntity) courses: Repository<CourseEntity>, 
              @InjectRepository(Category) categories: Repository<Category>,
              @InjectRepository(Video) videos: Repository<Video>,
              @InjectRepository(Image) images: Repository<Image>) {
    this.courses = courses;
    this.categories = categories;
    this.videos = videos;
    this.images = images;
  }

  //TODO: El tema de tener todos los servicios en un solo lado va en contra de hexagonal

  async createNewCourse(newCourseDto: NewCourseDto): Promise<CourseEntity> {
    
    const newCourse:CourseEntity = new CourseEntity();
    newCourse.name = newCourseDto.name;
    newCourse.category = await this.categories.findOneBy({id : newCourseDto.categoryId})
    newCourse.description = newCourseDto.description;
    newCourse.level = newCourseDto.level;
    newCourse.weeks = newCourseDto.weeks;
    newCourse.minutes = 0;
    newCourse.videos = [];
    
    return this.courses.save(newCourse);
  }

  async addVideo(addVideoDto: AddVideoDto): Promise<CourseEntity> {
    let course:CourseEntity = await this.courses.findOneBy({id : addVideoDto.courseId});
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
    let course: CourseEntity = await this.courses.findOneBy({ id : setImageDto.courseId});
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

  findAll(): Promise<CourseEntity[]> {
    return this.courses.find()
  }

  findById(idToFind: string): Promise<CourseEntity> {
    return this.courses.findOneBy({id: idToFind});
  }

  async findByCategory(categoryId: string): Promise<CourseEntity[]> {
    const categoryToFind: Category = await this.categories.findOneBy({id: categoryId});

    if (categoryToFind) {
     return this.courses.findBy({category: categoryToFind});
    }
  }

  findByLevel(level: string): Promise<CourseEntity[]> {
    return this.courses.findBy({level: level});
  }

  deleteById(idToDelete: string): void {
    this.courses.delete({id: idToDelete});
  }

  async deleteByCategory(categoryId: string): Promise<void> {
    const category: Category = await this.categories.findOneBy({id: categoryId});
    
    if (category) {
      this.courses.delete({category: category});
    }
  }

}
