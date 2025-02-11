import { Category } from 'src/category/entity/category.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  quantity: number;
  categories: string[];
}

//add update for categories
export class UpdateProductDto {
  name: string;
  price: number;
  description: string;
  quantity: number;
}
