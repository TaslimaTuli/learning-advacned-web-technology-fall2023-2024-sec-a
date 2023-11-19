import { Inventory } from 'src/inventory/entitie/inventory.entity';
import { FinancialReport } from 'src/report/entities/financial-report.entity';
import { Expense } from 'src/report/entities/expense.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from 'src/users/entities/user.entity';
import { Invoice } from 'src/invoices/entities/invoices.entity';
import { Product } from 'src/invoices/entities/product.entity';
// import { Invoices } from 'src/invoices/dto/invoice.dto';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'finance-and-billing',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '1234',
  entities: [Inventory, FinancialReport, Expense, User, Invoice, Product],
  synchronize: true,
};

export default config;
