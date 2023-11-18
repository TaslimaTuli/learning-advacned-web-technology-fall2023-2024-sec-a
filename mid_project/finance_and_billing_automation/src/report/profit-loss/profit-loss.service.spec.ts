import { Test, TestingModule } from '@nestjs/testing';
import { ProfitLossService } from './profit-loss.service';

describe('ProfitLossService', () => {
  let service: ProfitLossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfitLossService],
    }).compile();

    service = module.get<ProfitLossService>(ProfitLossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
