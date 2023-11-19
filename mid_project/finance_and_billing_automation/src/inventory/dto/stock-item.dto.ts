import { IsString, IsInt, Min, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StockItemDto {
  @ApiProperty({
    type: String,
    description: 'Item code of the stock item.',
    example: 'ABC123',
  })
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @ApiProperty({
    type: String,
    description: 'Name of the stock item.',
    example: 'Widget',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Price of the stock item.',
    example: 19.99,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of the stock item.',
    example: 100,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}
