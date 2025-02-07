import { Product } from "src/product/entity/product.entity";
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable} from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    // @ManyToMany(() => Product, (product) => product.categories)
    // @JoinTable()
    // products: Product[];
}