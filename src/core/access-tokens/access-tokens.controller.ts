import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';

@Controller('access-tokens')
export class AccessTokensController {
  constructor(private readonly accessTokensService: AccessTokensService) {}

  @Post()
  create(@Body() createAccessTokenDto: CreateAccessTokenDto) {
    return this.accessTokensService.create(createAccessTokenDto);
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.accessTokensService.findOne(token);
  }

  @Patch(':token')
  async update(@Param('token') token: string, @Body() updateAccessTokenDto: UpdateAccessTokenDto) {

    return await this.accessTokensService.update(token, updateAccessTokenDto);
  }
}
