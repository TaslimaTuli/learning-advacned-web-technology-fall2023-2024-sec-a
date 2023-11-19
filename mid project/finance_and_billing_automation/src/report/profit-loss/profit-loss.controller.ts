import { Controller } from '@nestjs/common';
import { ProfitLossService } from './profit-loss.service';

@Controller('profit-loss')
export class ProfitLossController {
  constructor(private readonly profitLossService: ProfitLossService) {}
}
