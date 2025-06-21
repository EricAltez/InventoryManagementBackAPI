import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto, LoadSaleDto } from './dto/sale.dto';
import { Public } from 'decorators/publicDecorator';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  //tocando esto
  @Public()
  @Post()
  createSale(@Body() loadSaleDto: LoadSaleDto) {
    console.log('loadSaleDto', loadSaleDto);
    if (!loadSaleDto.saleList) {
      throw new Error('Invalid data');
    }
    return this.saleService.createSale(loadSaleDto);
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto) {
    return this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleService.remove(+id);
  }
}
