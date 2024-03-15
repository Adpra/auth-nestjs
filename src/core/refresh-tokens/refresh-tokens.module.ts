import { Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokensController } from './refresh-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  controllers: [RefreshTokensController],
  providers: [RefreshTokensService],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
