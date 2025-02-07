import { User } from 'src/user/entity/user.entity';
import dataSource from './ormConfig';
import { Role } from '../role/entity/role.entity';
import { Permission } from 'src/permission/entity/permission.entity';
import { Product } from '../product/entity/product.entity';
import * as permissionsData from './permission.json';
import * as rolesData from './role.json';
import * as usersData from './user.json';
import * as productData from './product.json'
import { In, Repository } from 'typeorm';
import { hashPassword } from '../utils/bcrypt';


console.log('1.0');
let userRepository: Repository<User>;
let roleRepository: Repository<Role>;
let permissionRepository: Repository<Permission>;
let productRepository: Repository<Product>

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
  console.log(productRepository)
  // const newProduct = await productRepository.create(productData)
  // await productRepository.save(newProduct)
  console.log('done loadiong entities');
};

const loadRelationships = async () => {
  await loadRolePermissions();
  await loadUserRoles();
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
      console.log(u);
      console.log('all roles');
      console.log(await roleRepository.find());
      console.log(await userRepository.find());
      const defaultRoleName = 'user';
      console.log('searching in', [defaultRoleName, ...u.roles]);
      const userRoles = await roleRepository.findBy({
        name: In([defaultRoleName, ...u.roles]),
      });
      console.log(userRoles);
      const user = await userRepository.findOneBy({ username: u.username });
      user.roles = userRoles;
      await userRepository.save(user);
    }),
  );
  console.log('done loading user roles relationship');
};

//duplicated entries
const main = async () => {
  try {
    await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
    roleRepository = dataSource.getRepository(Role);
    permissionRepository = dataSource.getRepository(Permission);

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
