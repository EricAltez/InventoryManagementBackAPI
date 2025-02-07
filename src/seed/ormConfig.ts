import { DataSource } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Role } from '../role/entity/role.entity';
import { Permission } from 'src/permission/entity/permission.entity';
import { Product } from '../product/entity/product.entity';
// Adjust path to your User entity

const dataSource = new DataSource({
  type: 'mysql', // or 'mysql' | 'sqlite'
  host: 'localhost',
  port: 3306, // Change to 3306 for MySQL or 0 if using SQLite
  username: 'root', // Your DB username
  password: 'asdasd',
  database: 'inventorydb',
  entities: [User, Role, Permission, Product], // Include your entities here
  synchronize: true, // Use in development only! (Auto-creates tables)
});

export default dataSource;
