/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/image/domain/image.entity';


@Module({
    imports:[TypeOrmModule.forFeature([Category, Image])],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}
