import { Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PermissionGroup } from 'src/core/permission-groups/entities/permission-group.entity';
import { permissionGroupsData } from '../seedsData/permissionGroupsData';


export default class CreatePermissionGroups implements Seeder {
  public async run(factory: any, connection: Connection): Promise<any> {
    try {

      await connection.transaction(async (manager) => {
        const permissionGroupRepo = manager.getRepository(PermissionGroup);
    
        const createdPermissionGroups = await Promise.all(permissionGroupsData.map(async (permissionGroupData) => {
            const permission = await permissionGroupRepo.create(permissionGroupData);
            return permission;
        }));
    
        await permissionGroupRepo.save(createdPermissionGroups);
    });

    } catch (error) {
      console.error('Error seeding permissions:', error);
    }
  }
}

