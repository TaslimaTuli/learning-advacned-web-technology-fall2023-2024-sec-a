import { Test, TestingModule } from '@nestjs/testing';
import { ProfitLossController } from './profit-loss.controller';
import { ProfitLossService } from './profit-loss.service';

describe('ProfitLossController', () => {
  let controller: ProfitLossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfitLossController],
      providers: [ProfitLossService],
    }).compile();

    controller = module.get<ProfitLossController>(ProfitLossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
