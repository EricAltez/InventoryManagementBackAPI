import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Role } from './role/entities/role.entity';
import { RoleModule } from './role/role.module';
import { Permission } from './permission/entities/permission.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { SaleModule } from './sale/sale.module';
import { Sale, SaleProduct } from './sale/entities/sale.entity';
import { StockModule } from './stock/stock.module';

console.log(process.env.USERNAME, process.env.PASSWORD);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // credentials shouldn't be on plain text
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'asdasd',
      database: 'inventorydb',
      entities: [User, Role, Permission, Product, Category, Sale, SaleProduct],
      //synchronize: true shouldn't be used in production
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    ProductModule,
    CategoryModule,
    SaleModule,
    StockModule,
  ],
})
export class AppModule {}
