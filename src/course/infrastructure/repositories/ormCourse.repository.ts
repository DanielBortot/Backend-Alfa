import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "src/course/domain/ICourse.repository";
import { DataSource, Repository } from "typeorm";
import { CourseEntity } from "../entities/course.entity";
import { Category } from "src/category/category.entity";
import { CourseMapper } from "../mappers/course.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";

export class OrmCourseRepository extends Repository<CourseEntity> implements ICourseRepository {
  constructor(database: DataSource) {
    super(CourseEntity, database.manager);
  }

  async getById(courseId: string): Promise<Course> {
    try {
      const result = this.findOneBy({id: courseId});
      return CourseMapper.toDomain(result);
    } catch (error) {
      throw new HttpException("No se encontró el curso" ,HttpStatus.BAD_REQUEST);
    }
  }

  async getAllByCategory(category: Category): Promise<Course[]> {
    try {
      const result = await this.findBy({category: category});
      return result.map( course => CourseMapper.toDomain(course));
    } catch (error) {
      
    }
  }
  
  getAllByLevel(level: string): Promise<Course[]> {
		return this.findBy({level: level});
  }

  getAll(): Promise<Course[]> {
      return this.find();
  }

  deleteById(courseId: string): void{
    this.delete({id: courseId});
  }

  deleteAllByCategory(category: Category): void {
    this.delete({category: category});
  }

  storeAndSave(course: Course): Promise<Course> {
		return this.save(course);	
	}
}