import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsBoolean() 
  is_active?: boolean;
}
