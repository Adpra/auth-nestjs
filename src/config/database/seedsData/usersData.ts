import { DeepPartial } from 'typeorm';
import { User } from 'src/core/users/entities';

export const usersData: DeepPartial<User>[] = [
  {
    first_name: 'Super',
    last_name: 'Admin',
    username: 'superadmin',
    email: 'superadmin@example.com',
    password: '123456',
    photo: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    is_active: true,
    roles: [{
      id: 1
    }]
  },
  {
    first_name: 'Admin',
    last_name: 'User',
    username: 'adminuser',
    email: 'adminuser@example.com',
    password: '123456',
    photo: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    is_active: true,
    roles: [{
      id: 2
    }]
  }
]
