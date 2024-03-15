import { Module } from '@nestjs/common';
import { AccessTokensService } from './access-tokens.service';
import { AccessTokensController } from './access-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import { RefreshToken } from '../refresh-tokens';

@Module({
  imports: [TypeOrmModule.forFeature([AccessToken, RefreshToken])],
  controllers: [AccessTokensController],
  providers: [AccessTokensService],
  exports: [AccessTokensService],
})
export class AccessTokensModule {}
