import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { Category } from "src/category/entity/category.entity";

@Entity() 
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    quantity: number;

    // @ManyToMany(() => Category, (category) => category.products)
    // @JoinTable()
    // categories: Category[];
}