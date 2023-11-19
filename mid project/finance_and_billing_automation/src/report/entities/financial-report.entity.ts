import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FinancialReport {
  @ApiProperty({
    description: 'The unique identifier of the financial report.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The date of the financial report.' })
  @Column()
  date: Date;

  // @ApiPropertyOptional({ description: 'The end date of the financial report.' })
  // @Column()
  // endDate: Date;

  @ApiProperty({
    type: () => [Expense],
    description: 'Array of expenses associated with the financial report.',
  })
  @OneToMany(() => Expense, (expense) => expense.financialReport, {
    cascade: ['insert'],
  })
  expenses: Expense[];

  @ApiProperty({
    description: 'Total expense of the financial report.',
    default: 0,
  })
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  totalExpense: number;
}
