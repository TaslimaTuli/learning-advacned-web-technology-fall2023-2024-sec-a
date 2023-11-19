import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @ApiProperty({
    type: String,
    description: 'Description of the expense.',
    example: 'Office Supplies',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the expense.',
    example: 50.0,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
