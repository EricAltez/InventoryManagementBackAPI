import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Role } from './entity/role.entity';
import { RoleModule } from './role/role.module';
import { Permision } from './entity/permision.entity';

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
      database: 'loggin',
      entities: [User, Role, Permision],
      //synchronize: true shouldn't be used in production
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
  ],
})
export class AppModule {}
