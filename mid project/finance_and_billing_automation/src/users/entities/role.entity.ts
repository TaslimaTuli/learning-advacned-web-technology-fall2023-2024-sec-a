import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity()
export class Roles {
  @ApiProperty({ description: 'The unique identifier of the user.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique username for the user.',
    uniqueItems: true,
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: 'Password for the user.' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Name of the user.' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Unique email for the user.', uniqueItems: true })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Role of the user.' })
  @Column()
  role: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
