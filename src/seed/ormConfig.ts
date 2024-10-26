import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import { Role } from '../entity/role.entity';
import { Permission } from '../entity/permission.entity';
// Adjust path to your User entity

const dataSource = new DataSource({
  type: 'mysql', // or 'mysql' | 'sqlite'
  host: 'localhost',
  port: 3306, // Change to 3306 for MySQL or 0 if using SQLite
  username: 'root', // Your DB username
  password: 'asdasd',
  database: 'loggin',
  entities: [User, Role, Permission], // Include your entities here
  synchronize: true, // Use in development only! (Auto-creates tables)
});

export default dataSource;
