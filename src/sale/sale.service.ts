import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/sale.dto';
import { Sale } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'product/entities/product.entity';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createSale(saleData: CreateSaleDto): Promise<Sale> {
    const saleProducts = await Promise.all(
      saleData.products.map(async (saleRequest) => {
        const product = await this.productRepository.findOneBy({
          id: saleRequest.productId,
        });
        if (!product) {
          throw new Error(`Product with id ${saleRequest.productId} not found`);
        }
        const res = {
          quantity: saleRequest.quantity,
          unitPrice: product.price,
          productId: saleRequest.productId,
        };
        return res;
      }),
    );
    const creationData = { ...saleData, products: saleProducts };
    console.log(creationData);

    const newSale = await this.saleRepository.create(creationData);
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
