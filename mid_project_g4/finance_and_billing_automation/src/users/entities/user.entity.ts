import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'The unique identifier of the user.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The unique username of the user.',
    uniqueItems: true,
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'The hashed password of the user.' })
  @Column()
  password: string;

  @ApiProperty({ description: 'The name of the user.' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The unique email address of the user.',
    uniqueItems: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'The role of the user.' })
  @Column()
  role: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
