import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class productDto {
  @ApiProperty({
    type: String,
    description: 'Description of the product.',
    example: 'Widget',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Amount of the product.',
    example: 10.0,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
