import { productDto } from './product.dto';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Invoice } from 'src/invoices/entities/invoices.entity';
export class InvoiceDto {
  @IsNotEmpty()
  @IsArray()
  products: productDto[];
}
