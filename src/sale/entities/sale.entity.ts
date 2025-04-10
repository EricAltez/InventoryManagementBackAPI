import { Product } from '../../product/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale, {
    cascade: true,
  })
  saleProducts: SaleProduct[];
}

@Entity()
export class SaleProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column('decimal')
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.saleProducts)
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.saleProducts)
  sale: Sale;
}
