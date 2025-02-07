import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async createProduct(productData: CreateProductDto): Promise<Product> {
    console.log(this.productRepository)
    const newProduct = this.productRepository.create(productData);
    //to do: for each category, add it to the product
    await this.productRepository.save(newProduct)
    return newProduct;
  }

  findAll() {
    console.log(this.productRepository)
    return this.productRepository.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
