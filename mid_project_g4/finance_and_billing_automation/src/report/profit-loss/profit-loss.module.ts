import { Module } from '@nestjs/common';
import { ProfitLossService } from './profit-loss.service';
import { ProfitLossController } from './profit-loss.controller';

@Module({
  controllers: [ProfitLossController],
  providers: [ProfitLossService],
})
export class ProfitLossModule {}
