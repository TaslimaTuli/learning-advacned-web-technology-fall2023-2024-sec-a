import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    type: String,
    description: 'Username for signing in.',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password for signing in.',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
