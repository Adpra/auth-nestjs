import { Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from 'src/core/roles/entities';
import { Permission } from 'src/core/permissions/entities';
import { rolesData } from '../seedsData/rolesData';


export default class CreateRoles implements Seeder {
  public async run(factory: any, connection: Connection): Promise<any> {
    try {
      
      await connection.transaction(async (manager) => {
        const roleRepo = manager.getRepository(Role);
        const permissionRepo = manager.getRepository(Permission);
    
        const createdRoles = await Promise.all(rolesData.map(async (roleData) => {
            const role = await roleRepo.create(roleData);
            const permissions = await permissionRepo.findByIds(roleData.permissions);
            role.rolePermissions = permissions;
            return role;
        }));
    
        await roleRepo.save(createdRoles);
    });

    } catch (error) {
      console.error('Error seeding roles:', error);
    }
  }
}

