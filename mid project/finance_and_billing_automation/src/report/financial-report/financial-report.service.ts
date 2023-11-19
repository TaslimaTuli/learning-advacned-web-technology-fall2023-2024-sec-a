import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialReportDto } from '../dto/financial-report.dto';
import { FinancialReport } from '../entities/financial-report.entity';
import { Expense } from '../entities/expense.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(FinancialReport)
    private readonly financialReportRepository: Repository<FinancialReport>,
    @InjectRepository(Expense)
    private readonly ExpenseRepository: Repository<Expense>,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createFinancialReport(
    financialReportDto: FinancialReportDto,
  ): Promise<FinancialReport> {
    const { expenses } = financialReportDto;

    if (!Array.isArray(expenses)) {
      throw new Error('Expenses must be an array'); //console
    }

    let totalExpense = 0;
    const financialReport = new FinancialReport();
    financialReport.date = new Date();

    //sum of price
    for (const expenseDto of expenses) {
      totalExpense += parseFloat(expenseDto.price + '');
    }
    financialReport.totalExpense = totalExpense;
    // Create fin report

    const finReport =
      await this.financialReportRepository.save(financialReport);

    //insert in expense table
    for (const expenseDto of expenses) {
      const expense = new Expense();
      expense.description = expenseDto.description;
      expense.price = parseFloat(expenseDto.price + '');
      expense.financialReport = financialReport;
      expense.financialReportId = finReport.id;
      await this.ExpenseRepository.save(expense);
    }
    financialReport.totalExpense = totalExpense;

    return finReport;
  }

  async getFinancialReports(): Promise<FinancialReport[]> {
    return await this.financialReportRepository.find({
      relations: ['expenses'],
    });
  }
}
