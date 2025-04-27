import { Injectable } from '@nestjs/common';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Category } from '../category/entities/category.entity';
import { Public } from 'decorators/publicDecorator';

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
        console.log(`new category saved ${category}`);
        return category;
      }),
    );
    const creationData = { ...productData, categories: newProductCategories };
    const newProduct = await this.productRepository.create(creationData);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findByName(userName: string) {
    const product = await this.productRepository.findOne({
      where: { name: userName },
    });
    if (!product) {
      return 'product not found';
    }
    return product;
  }

  async findById(productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      return 'product not found';
    }
    return product;
  }

  async update(productid: number, updateProductDto: UpdateProductDto) {
    const productoToUpdate = await this.productRepository.findOne({
      where: { id: productid },
    });
    if (!productoToUpdate) {
      return 'product not found';
    }
    Object.assign(productoToUpdate, updateProductDto);
    await this.productRepository.save(productoToUpdate);
    return productoToUpdate;
  }

  async remove(productId: number) {
    const productToRemove = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!productToRemove) {
      console.log('product not found');
      return;
    }
    await this.productRepository.remove(productToRemove);
    return;
  }

  async updateStock(prodictId: number, quantitySold: number) {
    const productToUpdate = await this.productRepository.findOne({
      where: { id: prodictId },
    });
    if (!productToUpdate) {
      return 'product not found';
    }
    if (productToUpdate.stock < quantitySold) {
      //turn to trow error
      return 'not enough stock';
    }
    productToUpdate.stock = productToUpdate.stock - quantitySold;
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }
}
