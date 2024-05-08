/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Image } from 'src/image/domain/image.entity';
import { SetImageDto } from './dto/setImage.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Image) 
        private imageRepository: Repository<Image>,
    ){};

    async createCategory(createCatekDto: CreateCategoryDto):Promise<Category>{
        const {name, description} = createCatekDto;

        const category = this.categoryRepository.create({
            name,
            description
        });

        await this.categoryRepository.save(category);
        return category;

    }

    async setImage(setImageDto: SetImageDto) {
        const category: Category = await this.categoryRepository.findOneBy({ id: setImageDto.categoryId });
        const image: Image = await this.imageRepository.findOneBy({ id: setImageDto.imageId})
    
        if (category === null) {
          return null;
        }
        if (image === null) {
          return null;
        }
    
        category.icon = image;
    
        return this.categoryRepository.save(category);
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
