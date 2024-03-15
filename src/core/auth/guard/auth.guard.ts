import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../../common/constants/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/constants';
import { UsersService } from '../../users';
import { AccessTokensService } from 'src/core/access-tokens';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UsersService,
    private accessTokensService: AccessTokensService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      const user = await this.user(payload.sub);       
      
      if(!user){
        throw new UnauthorizedException();
      }

      const expiresAt = await this.expiresAt(token);

      if(expiresAt <= new Date()){
        throw new UnauthorizedException();
      }

      request['user'] = {...payload, role: user.role, rolePermissions: user.rolePermissions};
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async user(id: number) {
    const user = await this.usersService.findOne(id);

    const userRole = user.roles?.map(role => role.code);    

    const rolePermissions = user.roles
    ?.flatMap(role => role.rolePermissions.map(permission => ({
      group: permission.permission_group_code,
      code: permission.code
    })));
    
    return {...user, role: userRole, rolePermissions: rolePermissions};
  }

  private async expiresAt(token: string) {
    const access_token = await this.accessTokensService.findOne(token);

    return access_token.expires_at;
  }
}
