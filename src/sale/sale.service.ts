import { Injectable } from '@nestjs/common';
import { LoadSaleDto } from './dto/sale.dto';
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

  // This method is used to create a sale with a list of products
  async createSale(saleData: LoadSaleDto): Promise<Sale> {
    const saleProducts = await Promise.all(
      saleData.saleList.map(async (saleRequest) => {
        const product = await this.productRepository.findOneBy({
          id: saleRequest.id,
        });
        const res = new SaleProduct();
        res.quantity = saleRequest.quantity;
        res.unitPrice = product.price;
        res.product = product;

        // Check if the product is in stock
        if (product.stock < saleRequest.quantity) {
          throw new Error(
            `Insufficient stock for product ID ${saleRequest.id}. Available: ${product.stock}, Requested: ${saleRequest.quantity}`,
          );
        }
        await this.productService.updateStock(
          saleRequest.id,
          saleRequest.quantity,
        );
        return res;
      }),
    );

    const creationData = { ...saleData, products: saleProducts };

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
