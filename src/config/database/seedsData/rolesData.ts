export const rolesData = [
  {
      id: 1,
      name: 'Super Admin',
      description: 'super',
      code: 'SUPER_ADMIN',
      level_access: 1,
      permissions: [1,2,3,4,5,6,7,8,9]
  },
  {
      id: 2,
      name: 'Admin',
      description: 'admin',
      code: 'ADMIN',
      level_access: 2,
      permissions: [1,2,3,4,]
  },
  {
      id: 3,
      name: 'User',
      description: 'user',
      code: 'USER',
      level_access: 3,
      permissions: [1]
  }

  // Add more roles as needed
];
