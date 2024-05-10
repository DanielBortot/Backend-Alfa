import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../dtos/createBlog.dto';
import { Blog } from 'src/blog/domain/blog';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBlogDto } from '../dtos/updateBlog.dto';
import { Image } from 'src/image/domain/image.entity';
import { Category } from 'src/category/category.entity';

@Injectable()
export class BlogService {
  private blogDB: Repository<Blog>;
  private imageDB: Repository<Image>;
  private categoryDB: Repository<Category>;

  constructor(
    @InjectRepository(Blog) blogDB,
    @InjectRepository(Image) imageDB,
    @InjectRepository(Category) categoryDB,
  ) {
    this.blogDB = blogDB;
    this.imageDB = imageDB;
    this.categoryDB = categoryDB;
  }

  async create(payload: CreateBlogDto): Promise<Blog> {
    const image = await this.imageDB.findOneBy({ id: payload.id_imagen });
    const category = await this.categoryDB.findOneBy({
      id: payload.id_category,
    });
    const blog = this.blogDB.create({
      ...payload,
      id_imagen: image,
      id_category: category,
    });
    return await this.blogDB.save(blog);
  }

  async findOne(id: string) {
    try {
      const oneBlog = await this.blogDB.findOneBy({ id });
      return oneBlog;
    } catch (e) {
      return 'Blog not found, try again!';
    }
  }
  async findAll() {
    const allBlogs = await this.blogDB.find();
    return allBlogs;
  }

  async update(id: string, payload: UpdateBlogDto) {
    const image = await this.imageDB.findOneBy({ id: payload.id_imagen });
    const category = await this.categoryDB.findOneBy({
      id: payload.id_category,
    });
    const date = new Date();
    const newBlog = {
      fecha: date,
      ...payload,
      id_imagen: image,
      id_category: category,
    };
    try {
      await this.blogDB.update(id, newBlog);
      return this.findOne(id);
    } catch (e) {
      return 'Blog not found, try again!';
    }
  }

  async remove(id: string) {
    //Probable uso de softdelete
    try {
      await this.blogDB.delete(id);
      return 'Blog has been removed';
    } catch (e) {
      return 'Blog not found!!';
    }
  }
}
