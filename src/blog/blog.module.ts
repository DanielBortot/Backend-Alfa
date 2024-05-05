import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './infrastructure/controller/blog/blog.controller';
import { BlogService } from './application/services/blog.service';
import { Blog } from './domain/blog';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
