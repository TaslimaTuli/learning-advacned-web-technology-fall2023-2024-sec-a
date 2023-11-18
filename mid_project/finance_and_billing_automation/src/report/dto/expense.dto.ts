import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class ExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
