import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Role } from './role/entity/role.entity';
import { RoleModule } from './role/role.module';
import { Permission } from 'src/permission/entity/permission.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'asdasd',
      database: 'inventorydb',
      entities: [User, Role, Permission, Product],
      //synchronize: true shouldn't be used in production
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
