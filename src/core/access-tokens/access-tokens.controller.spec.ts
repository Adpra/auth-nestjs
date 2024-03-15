import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokensController } from './access-tokens.controller';
import { AccessTokensService } from './access-tokens.service';

describe('AccessTokensController', () => {
  let controller: AccessTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessTokensController],
      providers: [AccessTokensService],
    }).compile();

    controller = module.get<AccessTokensController>(AccessTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
