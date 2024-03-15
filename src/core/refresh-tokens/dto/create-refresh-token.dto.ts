import { AccessToken } from "src/core/access-tokens";
import { User } from "src/core/users";

export class CreateRefreshTokenDto {
  token: string;
  expires_at: Date;
  created_at: Date;

  user: User;
  accessToken: AccessToken;
}
