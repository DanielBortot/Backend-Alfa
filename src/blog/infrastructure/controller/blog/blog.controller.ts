import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from '../../../application/services/blog.service';
import { CreateBlogDto } from '../../../application/dtos/createBlog.dto';
import { UpdateBlogDto } from 'src/blog/application/dtos/updateBlog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  create(@Body() payload: CreateBlogDto) {
    return this.blogService.create(payload);
  }

  @Get()
  findAll() {
    const allBlogs = this.blogService.findAll();
    return allBlogs;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const oneBlog = this.blogService.findOne(id);
    return oneBlog;
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() payload: UpdateBlogDto) {
    const updated = this.blogService.update(id, payload);
    return updated;
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    const deleted = this.blogService.remove(id);
    return deleted;
  }
}
