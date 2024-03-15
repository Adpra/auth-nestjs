import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';
import { Repository } from 'typeorm';
import { AccessToken } from './entities/access-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from '../refresh-tokens';

@Injectable()
export class AccessTokensService {
  constructor(
    @InjectRepository(AccessToken)
    private accessTokensRepository: Repository<AccessToken>,

    @InjectRepository(RefreshToken)
    private refreshTokensRepository: Repository<RefreshToken>,
  ){}

  create(createAccessTokenDto: CreateAccessTokenDto) {
    return this.accessTokensRepository.save(createAccessTokenDto);
  }

  findOne(token: string) {
    return this.accessTokensRepository.findOne({ where: { token } });
  }

  async update(token: string, updateAccessTokenDto: UpdateAccessTokenDto) {

    const accessToken = await this.accessTokensRepository.findOne({ where: { token } , relations: ['refreshToken']});

    if (!accessToken) {
      throw new NotFoundException('Access token not found');
    }

    accessToken.expires_at = updateAccessTokenDto.expires_at; 

     await this.accessTokensRepository.save(accessToken);  

    if(accessToken.refreshToken) {
      accessToken.refreshToken.expires_at = updateAccessTokenDto.expires_at;
      
      await this.refreshTokensRepository.save(accessToken.refreshToken);
    }
  }

}
