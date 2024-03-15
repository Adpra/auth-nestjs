import { Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Role } from 'src/core/roles/entities';
import { User } from 'src/core/users';
import { usersData } from '../seedsData/usersData';
import * as bcrypt from 'bcrypt';

export default class CreateUserSeeder implements Seeder {
  public async run(factory: any, connection: Connection): Promise<any> {
    try {
      await connection.transaction(async (manager) => {
        const userRepo = manager.getRepository(User);
        const roleRepo = manager.getRepository(Role);
    
        const createdUsers = await Promise.all(usersData.map(async (userData) => {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            
            const rolesIds = userData.roles.map(role => role.id);
            const roles = await roleRepo.findByIds(rolesIds);
            
            const user = userRepo.create(userData);
            user.roles = roles;
            return user;
        }));
    
        await userRepo.save(createdUsers);
      });
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }
}

