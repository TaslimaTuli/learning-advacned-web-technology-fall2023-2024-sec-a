// expense.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FinancialReport } from './financial-report.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  financialReportId: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(
    () => FinancialReport,
    (financialReport) => financialReport.expenses,
  )
  // @Exclude() // Exclude financialReport during transformation
  financialReport: FinancialReport;
}
