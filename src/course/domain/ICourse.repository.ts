import { Category } from "src/category/category.entity";
import { Course } from "./Course";

export interface ICourseRepository {
  getById(courseId: string): Promise<Course>;
  getAllByCategory(category: Category): Promise<Course[]>;
  getAllByLevel(level: string): Promise<Course[]>;
  getAll(): Promise<Course[]>;

  deleteById(courseId: string): void;
  deleteAllByCategory(category: Category): void;

  storeAndSave(course: Course): Promise<Course>;
  
}