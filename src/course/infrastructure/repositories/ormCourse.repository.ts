import { Course } from "src/course/domain/Course";
import { ICourseRepository } from "src/course/domain/ICourse.repository";
import { DataSource, Repository } from "typeorm";
import { CourseEntity } from "../entities/course.entity";
import { Category } from "src/category/category.entity";
import { CourseMapper } from "../mappers/course.mapper";
import { HttpException, HttpStatus } from "@nestjs/common";

export class OrmCourseRepository extends Repository<CourseEntity> /*implements ICourseRepository*/ {
  constructor(database: DataSource) {
    super(CourseEntity, database.manager);
  }

  async getById(courseId: string): Promise<CourseEntity> {
    try {
      const result = await this.findOne({
        relations:{
          image: true,
          category: true
          // videos: true
        }, where: {
          id: courseId
        }});
      // return CourseMapper.toDomain(result);
      return result;
    } catch (error) {
      throw new HttpException("No se encontró el curso" ,HttpStatus.BAD_REQUEST);
    }
  }

  async getAllByCategory(categoryId: string): Promise<CourseEntity[]> {
    try {
      const result = await this.find({relations: {
        image: true,
        category: true
        // videos: true
      }, where:{
        category: {
          id: categoryId
        }
      }});
      // return result.map( course => CourseMapper.toDomain(course));
      return result;
    } catch (error) {
      throw new HttpException("No se encontraron cursos de la categoría", HttpStatus.BAD_REQUEST);
    }
  }
  
  async getAllByLevel(level: string): Promise<CourseEntity[]> {
		try {
      const result = await this.find({relations: {
        image: true,
        category: true
        // videos: true
      }, where:{
        level: level
      }});
      // return result.map(course => CourseMapper.toDomain(course))
      return result;
    } catch (error) {
      throw new HttpException("No se encontraron cursos de nivel " + level, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(): Promise<CourseEntity[]> {
    try {
      const result = await this.find({
        relations: {
          image: true,
          category: true,
          // videos: true
        } });
      
      
      return result;
    } catch (error) {
      throw new HttpException("No se encontraron cursos", HttpStatus.BAD_REQUEST);
    }
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