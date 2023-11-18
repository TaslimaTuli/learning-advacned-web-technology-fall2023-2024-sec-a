// financial-report.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class FinancialReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() //{ default: new Date() }
  date: Date;

  // @Column()
  // endDate: Date;

  // @OneToMany(() => Expense, (expense) => expense.financialReport)
  @OneToMany(() => Expense, (expense) => expense.financialReport, {
    cascade: ['insert'], // Add this option to cascade operations to the related Expense entities
  })
  expenses: Expense[];

  @Column({ default: 0 })
  totalExpense: number;
}
