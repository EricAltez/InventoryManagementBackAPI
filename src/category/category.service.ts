import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOneByName(categoryName: string) {
    const categoryData = await this.categoryRepository.findOne({
      where: { name: categoryName },
    });
    if (!categoryData) {
      console.log('category not found');
      return;
    }
    return categoryData;
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryToUpdate = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!categoryToUpdate) {
      return 'category not found';
    }
    Object.assign(categoryToUpdate, updateCategoryDto);
    await this.categoryRepository.save(categoryToUpdate);
    return categoryToUpdate;
  }

  async remove(categoryId: number) {
    const categoryToRemove = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!categoryToRemove) {
      console.log('category not found');
      return;
    }
    await this.categoryRepository.remove(categoryToRemove);
    return;
  }
}
