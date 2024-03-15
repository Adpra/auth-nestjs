import { User } from "src/core/users";

export class CreateAccessTokenDto {
  token: string;
  expires_at: Date;
  created_at: Date;
  user: User;
}
