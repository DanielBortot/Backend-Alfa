import { Category } from "src/category/category.entity";
import { Image } from "src/image/domain/image.entity";
import { Video } from "src/video/entities/video.entity";

export class Course {
  constructor(
    id: string,
    name: string,
    description: string,
    level: string,
    weeks: number,
    minutes: number,
    image: Image, //!Entidad de BD, hay que corregir el módulo de imágenes
    category: Category, //!Same as above
    videos: Video[] //!Part 3
  ) {}
}