import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FinancialReport } from './financial-report.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Expense {
  @ApiProperty({ description: 'The unique identifier of the expense.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The ID of the associated financial report.' })
  @Column()
  financialReportId: number;

  @ApiProperty({ description: 'Description of the expense.' })
  @Column()
  description: string;

  @ApiProperty({ description: 'Price of the expense.' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    type: () => FinancialReport,
    description: 'Financial report associated with the expense.',
  })
  @ManyToOne(
    () => FinancialReport,
    (financialReport) => financialReport.expenses,
  )
  financialReport: FinancialReport;
}
