import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class productDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
