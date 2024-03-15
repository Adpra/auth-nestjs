import { PermissionGroup } from "src/core/permission-groups/entities/permission-group.entity";
import { Role } from "src/core/roles/entities";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  permission_group_code: string;

  @ManyToMany(() => Role, (role) => role.rolePermissions)
  roles: Role[];

  // @ManyToMany(() => User, (user) => user.permissions)
  // users: User[];

  @ManyToOne(() => PermissionGroup, (permissionGroup) => permissionGroup.permissions)
  permissionGroup: PermissionGroup
}
