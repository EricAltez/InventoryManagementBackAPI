import { Category } from "src/entity/category.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from "typeorm";


export class ProductDto{
    name: string;
    price: number;
    description: string;
    quantity: number;
    categories: Category[];
}