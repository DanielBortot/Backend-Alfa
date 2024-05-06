import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from '../dtos/createBlog.dto';
import { Blog } from 'src/blog/domain/blog';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBlogDto } from '../dtos/updateBlog.dto';

@Injectable()
export class BlogService {
  private blogDB: Repository<Blog>;

  constructor(@InjectRepository(Blog) blogDB) {
    this.blogDB = blogDB;
  }

  async create(payload: CreateBlogDto): Promise<Blog> {
    const blog = this.blogDB.create(payload);
    return await this.blogDB.save(blog);
  }

  async findOne(id: string) {
    const oneBlog = await this.blogDB.findOneBy({ id });
    return oneBlog;
  }
  async findAll() {
    const allBlogs = await this.blogDB.find();
    return allBlogs;
  }

  async update(id: string, payload: UpdateBlogDto) {
    const date = new Date();
    const newBlog = {
      fecha: date,
      ...payload,
    };
    await this.blogDB.update(id, newBlog);
    return this.findOne(id);
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
