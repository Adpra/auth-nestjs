import { AccessToken } from "src/core/access-tokens";
import { User } from "src/core/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  token: string

  @Column()
  expires_at: Date

  @Column()
  created_at: Date

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @OneToOne(() => AccessToken , (accessToken) => accessToken.refreshToken)
  @JoinColumn({ name: 'access_token_id' })
  accessToken: AccessToken
}
