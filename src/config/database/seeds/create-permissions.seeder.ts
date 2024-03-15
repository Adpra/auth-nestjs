import { Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Permission } from 'src/core/permissions/entities';
import { permissionsData } from '../seedsData/permissionsData';


export default class CreatePermissions implements Seeder {
  public async run(factory: any, connection: Connection): Promise<any> {
    try {

      await connection.transaction(async (manager) => {
        const permissionRepo = manager.getRepository(Permission);
    
        const createdPermissions = await Promise.all(permissionsData.map(async (permissionData) => {
            const permission = await permissionRepo.create(permissionData);
            return permission;
        }));
    
        await permissionRepo.save(createdPermissions);
    });

    } catch (error) {
      console.error('Error seeding permissions:', error);
    }
  }
}

