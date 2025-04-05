import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { Product } from '../product/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Sale, SaleProduct } from '../sale/entities/sale.entity';

//change credentials to be ENV
const dataSource = new DataSource({
  type: 'mysql', // or 'mysql' | 'sqlite'
  host: 'localhost',
  port: 3306, // Change to 3306 for MySQL or 0 if using SQLite
  username: 'root', // Your DB username
  password: 'asdasd',
  database: 'inventorydb',
  entities: [User, Role, Permission, Product, Category, Sale, SaleProduct], // Include your entities here
  synchronize: true, // Use in development only! (Auto-creates tables)
});

export default dataSource;
