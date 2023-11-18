// financial-report.dto.ts
import { IsDate, IsNotEmpty, IsArray } from 'class-validator';
import { ExpenseDto } from './expense.dto';

export class FinancialReportDto {
  // @IsNotEmpty()
  // @IsDate()
  // date: Date;

  // @IsNotEmpty()
  // @IsDate()
  // endDate: Date;

  @IsNotEmpty()
  @IsArray()
  expenses: ExpenseDto[];
}
