import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Sale } from './entities/sale.entity';
import { ProductService } from 'product/product.service';
import { Category } from 'category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale, Category])],
  controllers: [SaleController],
  providers: [SaleService, ProductService],
})
export class SaleModule {}
