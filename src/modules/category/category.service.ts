import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@/models';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category) private categoryModel: typeof Category

    ) { }

    createCategory(createCategoryDto: CreateCategoryDto) {
        return this.categoryModel.create(createCategoryDto as Category);
    }

    findAllCategories() {
        return {
            message:"Ok"
        }
    }

    findOneCategory(id: number) {
        return this.categoryModel.findByPk(id);
    }
}
