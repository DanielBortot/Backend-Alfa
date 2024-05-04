/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Category } from "./category.entity";

@EntityRepository(Category)
export class CategoryRepository<Category> extends Repository<Category>{
    
    
}