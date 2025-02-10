import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { Category } from 'src/category/entity/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const newProductCategories = await Promise.all(
      productData.categories.map(async (categoryName) => {
        let category = await this.categoryRepository.findOneBy({
          name: categoryName,
        });
        if (!category) {
          category = await this.categoryRepository.save({ name: categoryName });
        }
        console.log(category);
        return category;
      }),
    );
    const creationData = { ...productData, categories: newProductCategories };
    const newProduct = await this.productRepository.create(creationData);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  findAll() {
    console.log(this.productRepository);
    return this.productRepository.find();
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
