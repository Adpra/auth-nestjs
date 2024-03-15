import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/common/constants';
import { AccessTokensService } from '../access-tokens/access-tokens.service';
import { CreateAccessTokenDto } from '../access-tokens/dto/create-access-token.dto';
import { RefreshTokensService } from '../refresh-tokens/refresh-tokens.service';
import { CreateRefreshTokenDto } from '../refresh-tokens/dto/create-refresh-token.dto';
import { UpdateAccessTokenDto } from '../access-tokens';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private accessTokensService: AccessTokensService,
    private refreshTokensService: RefreshTokensService
  ) {}


  async signUp(
    username: string,
    password: string,
    email: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.usersService.findOneByUser({email});
    
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.create({
      username,
      password: hashedPassword,
      email,
    });
    const payload = { sub: createdUser.id, username: createdUser.username };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3d',
    })

    this.createToken(accessToken, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string, refresh_token: string }> {
    const user = await this.usersService.findOneByUser({username});
    
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3d',
    })    

    this.createToken(token, refreshToken);

    return {
      access_token: token,
      refresh_token: refreshToken
    };
  }

  async signOut(token: string): Promise<any> {
    const updateAccessTokenDto : UpdateAccessTokenDto = {
      expires_at: new Date()
    }

    await this.accessTokensService.update(token, updateAccessTokenDto);

    return {
      success: true,
      message: 'Sign out successfully'
    };
  }

  private async createToken(access_token: string, refresh_token : string): Promise<any> {
    try {
      const user = await this.jwtService.verifyAsync(access_token, {
        secret: jwtConstants.secret,
      });
  
      const expiresAtAcessToken = new Date(user.exp * 1000);

      const createAccessTokenDto: CreateAccessTokenDto = {
        token: access_token,
        expires_at: expiresAtAcessToken,
        created_at: new Date(),
        user: user.sub
      };

      const accessToken = await this.accessTokensService.create(createAccessTokenDto);

      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: jwtConstants.secret,
      });

      const expiresAtRefreshToken = new Date(payload.exp * 1000);

      const createRefreshTokenDto: CreateRefreshTokenDto = {
        token: refresh_token,
        expires_at: expiresAtRefreshToken,
        created_at: new Date(),
        user: payload.sub,
        accessToken: accessToken
      };

      await this.refreshTokensService.create(createRefreshTokenDto);
      
    } catch(e) {
      console.log(e);
    }
  }

}