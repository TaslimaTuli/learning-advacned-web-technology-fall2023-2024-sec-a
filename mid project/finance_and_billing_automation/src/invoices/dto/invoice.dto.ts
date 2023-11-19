import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { productDto } from './product.dto';

export class InvoiceDto {
  @ApiProperty({
    type: [productDto],
    description: 'Array of products for the invoice.',
    example: [
      { description: 'Widget', amount: 10.0 },
      { description: 'Gadget', amount: 20.0 },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  products: productDto[];
}
