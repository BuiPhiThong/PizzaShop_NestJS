import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@/models';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundError, throwError } from 'rxjs';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category) private categoryModel: typeof Category

    ) { }

    createCategory(createCategoryDto: CreateCategoryDto) {
        return this.categoryModel.create(createCategoryDto as Category);
    }

    async findAllCategories() {
        return {
            data: await this.categoryModel.findAll(),        
        }
    }

   async findOneCategory(id: number) {
        const result = await this.categoryModel.findByPk(id);
        if(!result){
            throw new NotFoundException(`Category with id ${id} not found!!!`)
        }
        
        return result
    }
}
