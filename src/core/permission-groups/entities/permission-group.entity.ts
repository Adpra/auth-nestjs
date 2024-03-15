import { Permission } from "src/core/permissions/entities";
import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'permission_groups' })
export class PermissionGroup {
  @PrimaryColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Permission, (permission) => permission.permissionGroup)
  @JoinTable({
    joinColumn: { name: 'permission_group_code' },
    inverseJoinColumn: { name: 'code' }
  })
  permissions: Permission[]
}
