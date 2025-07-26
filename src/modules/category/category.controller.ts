import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }


  @Post('create')
  createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryData)
  }

  @Get('all')
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }

  @Get('one/:id')
  FineOneCategory(@Param('id') id: number) {
    return this.categoryService.findOneCategory(id);
  }

}
