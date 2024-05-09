import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './infrastructure/controller/blog/blog.controller';
import { BlogService } from './application/services/blog.service';
import { Blog } from './domain/blog';
import { Image } from 'src/image/domain/image.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Blog, Image, Category])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
