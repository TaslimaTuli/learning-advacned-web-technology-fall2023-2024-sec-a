import { IsString, IsEmail, IsNumber } from 'class-validator';
export class EmployeeDto {
  @IsString()
  name: string;

  @IsString()
  contactNo: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  id: number;
}
