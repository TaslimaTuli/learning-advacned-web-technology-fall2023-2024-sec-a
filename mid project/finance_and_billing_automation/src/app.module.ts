import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { FinancialReportModule } from './report/financial-report/financial-report.module';
import { ProfitLossModule } from './report/profit-loss/profit-loss.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    InventoryModule,
    TypeOrmModule.forRoot(config),
    FinancialReportModule,
    ProfitLossModule,
    AuthModule,
    UsersModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //RolesGuard
  ],
})
export class AppModule {}
