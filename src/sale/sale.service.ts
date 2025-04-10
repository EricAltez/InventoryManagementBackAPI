import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/sale.dto';
import { Sale, SaleProduct } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'product/entities/product.entity';
import { ProductService } from 'product/product.service';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productService: ProductService,
  ) {}

  async createSale(saleData: CreateSaleDto): Promise<Sale> {
    const saleProducts = await Promise.all(
      saleData.products.map(async (saleRequest) => {
        const product = await this.productRepository.findOneBy({
          id: saleRequest.productId,
        });
        const res = new SaleProduct();
        res.quantity = saleRequest.quantity;
        res.unitPrice = product.price;
        res.product = product;

        await this.productService.updateStock(
          saleRequest.productId,
          saleRequest.quantity,
        );
        return res;
      }),
    );
    const creationData = { ...saleData, products: saleProducts };
    console.log(3);
    console.log(creationData);

    const newSale = await this.saleRepository.create({
      date: new Date(),
      saleProducts: saleProducts,
    });
    await this.saleRepository.save(newSale);
    return newSale;
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
