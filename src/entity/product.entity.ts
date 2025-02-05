import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./category.entity";

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

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable()
    categories: Category[];
}