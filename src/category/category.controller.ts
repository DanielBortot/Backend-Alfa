/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {
    // this.taskService = taskService;
  }

  @Post()
  createTask(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  getAllCategory(): Promise<Category[]>{
    return this.categoryService.getCategorys();
  }

  @Get('/:id')
  getCategoryById(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Delete('/:id')
  deleteCategoryById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
