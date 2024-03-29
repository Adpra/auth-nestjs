import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';

@Controller('refresh-tokens')
export class RefreshTokensController {
  constructor(private readonly refreshTokensService: RefreshTokensService) {}

  @Post()
  create(@Body() createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.refreshTokensService.create(createRefreshTokenDto);
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.refreshTokensService.findOne(token);
  }

}
