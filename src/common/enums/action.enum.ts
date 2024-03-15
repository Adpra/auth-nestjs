export enum Action {
  UsersAll = 'users.all',
  UsersCreate = 'users.create',
  UsersRead = 'users.read',
  UsersUpdate = 'users.update',
  UsersDelete = 'users.delete',
  
  RolesAll = 'roles.all',
  RolesCreate = 'roles.create',
  RolesRead = 'roles.read',
  RolesUpdate = 'roles.update',
  RolesDelete = 'roles.delete',
}

export const ActionGroup = {
  users: {
    All: Action.UsersAll,
    Create: Action.UsersCreate,
    Read: Action.UsersRead,
    Update: Action.UsersUpdate,
    Delete: Action.UsersDelete,
  },
  roles: {
    All: Action.RolesAll,
    Create: Action.RolesCreate,
    Read: Action.RolesRead,
    Update: Action.RolesUpdate,
    Delete: Action.RolesDelete,
  },
};
