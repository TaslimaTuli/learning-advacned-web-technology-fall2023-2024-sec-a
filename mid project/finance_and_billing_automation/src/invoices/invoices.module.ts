import { Module } from '@nestjs/common';
import { InvoiceService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoices.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Product, User]), UsersModule],
  providers: [InvoiceService, UsersService],
  controllers: [InvoicesController],
  exports: [UsersService],
})
export class InvoicesModule {}
