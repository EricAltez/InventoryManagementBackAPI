import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'asdasd',
      database: 'loggin',
      entities: [User],
      //synchronize: true shouldn't be used in production
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
