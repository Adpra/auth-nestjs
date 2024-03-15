import { Timestamp } from "src/common/helpers/entities";
import { Permission } from "src/core/permissions/entities";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'roles'})
export class Role extends Timestamp {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  code: string;

  @Column()
  level_access: number;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({name: 'role_has_permissions', joinColumn: {name: 'role_id'}, inverseJoinColumn: {name: 'permission_id'}})
  rolePermissions: Permission[];
}
