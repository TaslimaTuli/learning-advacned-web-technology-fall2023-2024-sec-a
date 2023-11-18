import { IsString, IsInt, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class StockItemDto {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}
