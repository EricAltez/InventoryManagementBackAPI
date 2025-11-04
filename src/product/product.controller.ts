import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Public } from 'decorators/publicDecorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //remove public decorator
  @Public()
  @Post()
  async createProduct(@Body() productDto: CreateProductDto) {
    console.log(productDto);
    return this.productService.createProduct(productDto);
  }

  //remove public decorator
  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('by-name/:name')
  findOneByName(@Param('name') name: string) {
    return this.productService.findByName(name);
  }

  //remove public decorator
  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findById(+id);
  }

  //add update for categories
  //remove public decorator
  @Public()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
