import { Course } from "src/course/domain/Course";

export class CourseMapper {
  static toDomain(course: any): Course {
    return new Course(
      course.id,
      course.name,
      course.description,
      course.level,
      course.weeks,
      course.minutes,
      course.image, //!Solo posible porque todavía no se aplica hexagonal en Imagen, categoría y videos
      course.category, //!Como dicho anteriormente, hay que mejorar esto
      course.videos
    )
  }
}