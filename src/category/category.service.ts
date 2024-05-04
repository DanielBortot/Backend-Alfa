/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){};

    async createCategory(createCatekDto: CreateCategoryDto):Promise<Category>{
        const {name, description, iconUrl} = createCatekDto;

        const category = this.categoryRepository.create({
            name,
            description,
            iconUrl
        });

        await this.categoryRepository.save(category);
        return category;

    }

    async getCategoryById(ids: string) : Promise<Category>{

        const found = await this.categoryRepository.findOne({where: {id: ids} });

        if(!found){
            throw new NotFoundException(`Task with /${ids}/ is not Found`);
        }else{
            return found;
        } 
    }

    async deleteCategory(id: string): Promise<void>{
        const result = await this.categoryRepository.delete({id: id});
        console.log('se elimino la categoria');
        console.log(result);
        
        if (result.affected === 0){
            throw new NotFoundException(`Category with /${id}/ is not Found`);
        }
    }




}
