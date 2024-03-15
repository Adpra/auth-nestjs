import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}
  create(createRefreshTokenDto: CreateRefreshTokenDto) {
    return this.refreshTokenRepository.save(createRefreshTokenDto);
  }

  findOne(token: string) {
    return this.refreshTokenRepository.findOne({ where: { token } });
  }

}
