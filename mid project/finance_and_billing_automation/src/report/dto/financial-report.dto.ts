import { IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExpenseDto } from './expense.dto';

export class FinancialReportDto {
  // @ApiProperty({
  //   type: Date,
  //   description: 'Start date for the financial report.',
  // })
  // @IsNotEmpty()
  // @IsDate()
  // date: Date;

  // @ApiProperty({
  //   type: Date,
  //   description: 'End date for the financial report.',
  // })
  // @IsNotEmpty()
  // @IsDate()
  // endDate: Date;

  @ApiProperty({
    type: [ExpenseDto],
    description: 'Array of expenses for the financial report.',
    example: [{ description: 'Office Supplies', price: 50.0 }],
  })
  @IsNotEmpty()
  @IsArray()
  expenses: ExpenseDto[];
}
