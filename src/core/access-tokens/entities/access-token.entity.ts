import { RefreshToken } from "src/core/refresh-tokens";
import { User } from "src/core/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  token: string;

  @Column()
  expires_at: Date;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.accessTokens)
  user: User;

  @OneToOne(() => RefreshToken , (refreshToken) => refreshToken.accessToken)
  refreshToken: RefreshToken;
}
