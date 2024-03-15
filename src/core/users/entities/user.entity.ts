import { Timestamp } from "src/common/helpers/entities";
import { Role } from "../../roles/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "src/core/permissions/entities";
import { AccessToken } from "src/core/access-tokens";
import { RefreshToken } from "src/core/refresh-tokens";

@Entity({ name: 'users' })
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  first_name: string;

  @Column({nullable: true})
  last_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  photo: string;

 @Column({ nullable: true})
  is_active: boolean; 

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_has_roles', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({ name: 'user_has_permissions', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'permission_id' } })
  permissions: Permission[];

  @OneToMany(() => AccessToken, (accessToken) => accessToken.user)
  accessTokens: AccessToken[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

}
