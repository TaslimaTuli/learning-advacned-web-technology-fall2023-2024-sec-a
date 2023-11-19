import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialReport } from '../entities/financial-report.entity';
import { FinancialService } from './financial-report.service';
import { FinancialController } from './financial-report.controller';
import { Expense } from '../entities/expense.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialReport, Expense, User]),
    //TypeOrmModule.forFeature([Expense]),
    // TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [FinancialController],
  providers: [FinancialService, UsersService],
  exports: [UsersService],
})
export class FinancialReportModule {}
