import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../../common/constants/metadata.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @Public()
  signUp(
    @Body() signUpDto: Record<string, any>
  ) {
    return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.username);
  }


  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @Public()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signout')
  // @UseGuards(AuthGuard)
 async signOut( @Req() req ) {
    const token = req.headers.authorization.split(' ')[1]; 
       
    return this.authService.signOut(token);
  }
}