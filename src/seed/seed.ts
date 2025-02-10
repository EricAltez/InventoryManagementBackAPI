import dataSource from './ormConfig';
import { User } from '../user/entity/user.entity';
import { Role } from '../role/entity/role.entity';
import { Permission } from '../permission/entity/permission.entity';
import { Product } from '../product/entity/product.entity';
import * as permissionsData from './permission.json';
import * as rolesData from './role.json';
import * as usersData from './user.json';
import * as productData from './product.json'
import * as categoryData from './category.json'
import { In, Repository } from 'typeorm';
import { hashPassword } from '../utils/bcrypt';
import { Category } from '../category/entity/category.entity';


console.log('1.0');
let userRepository: Repository<User>;
let roleRepository: Repository<Role>;
let permissionRepository: Repository<Permission>;
let productRepository: Repository<Product>;
let categoryRepository: Repository<Category>;

const loadEntities = async () => {
  console.log('loading entities');
  await permissionRepository.upsert(permissionsData, ['action', 'object']);
  await roleRepository.upsert(rolesData, ['name']);
  const userDataWithoutRoles = await Promise.all(usersData.map(async (u) => {
    u.password = await hashPassword(u.password)
    const { roles, ...data } = u;
    return data;
  }));
  await userRepository.upsert(userDataWithoutRoles, ['email']);
  await categoryRepository.upsert(categoryData, ['name']);
  const productDataWithoutCategories = await Promise.all(productData.map(async (p) => {
    const { categories, ...data } = p;
    return data;
  }));
  await productRepository.upsert(productDataWithoutCategories, ['name'])
  console.log('done loadiong entities');
};

const loadRelationships = async () => {
  await loadRolePermissions();
  await loadUserRoles();
  await loadProductCategories();
};

const loadRolePermissions = async () => {
  console.log('loading role permissions relationship');
  //admin
  const adminPermissions = await permissionRepository.findBy({
    action: 'all',
    object: 'all',
  });
  const adminRole = await roleRepository.findOneBy({ name: 'admin' });
  adminRole.permissions = adminPermissions;
  await roleRepository.save(adminRole);
  //user
  const userPermissions = await permissionRepository.findBy([
    { action: 'view', object: 'user' },
    { action: 'update', object: 'user' },
    { action: 'delete', object: 'user' },
  ]);
  const userRole = await roleRepository.findOneBy({ name: 'user' });
  userRole.permissions = userPermissions;
  await roleRepository.save(userRole);
  //manager
  const managerPermissions = await permissionRepository.findBy([
    { action: 'view', object: 'role' },
    { action: 'view', object: 'user' },
    { action: 'view', object: 'permission' },
    { action: 'update', object: 'user' },
  ]);
  const managerRole = await roleRepository.findOneBy({ name: 'manager' });
  managerRole.permissions = managerPermissions;
  await roleRepository.save(managerRole);
  console.log('done loading role permission relationship');
};

const loadUserRoles = async () => {
  console.log('loading user roles relationship');
  //user-roles
  await Promise.all(
    usersData.map(async (u) => {
      // console.log(u);
      // console.log('all roles');
      // console.log(await roleRepository.find());
      // console.log(await userRepository.find());
      const defaultRoleName = 'user';
      // console.log('searching in', [defaultRoleName, ...u.roles]);
      const userRoles = await roleRepository.findBy({
        name: In([defaultRoleName, ...u.roles]),
      });
      // console.log(userRoles);
      const user = await userRepository.findOneBy({ username: u.username });
      user.roles = userRoles;
      await userRepository.save(user);
    }),
  );
  console.log('done loading user roles relationship');
};

const loadProductCategories = async () => {
  console.log('loading product category relationship');
  await Promise.all(
    productData.map(async (p) => {
      const defaultProductName = 'product';
      const productCategories = await categoryRepository.findBy({
        name: In([defaultProductName, ...p.categories]),
      });
      const product = await productRepository.findOneBy({ name: p.name });
      product.categories = productCategories;
      await productRepository.save(product);
    }))
}

//duplicated entries
const main = async () => {
  try {
    await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
    roleRepository = dataSource.getRepository(Role);
    permissionRepository = dataSource.getRepository(Permission);
    productRepository = dataSource.getRepository(Product);
    categoryRepository = dataSource.getRepository(Category);

    await loadEntities();
    await loadRelationships();
    console.log('done');
    dataSource.destroy();
    return 1;
  } catch (error) {
    console.log(error);
    dataSource.destroy();
    return -1;
  }
};

main();
