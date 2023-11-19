import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Inventory')
export class Inventory {
  @ApiProperty({ description: 'The unique identifier of the inventory item.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique code for the inventory item.',
    uniqueItems: true,
  })
  @Column({ unique: true })
  itemCode: string;

  @ApiProperty({ description: 'Name of the inventory item.' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Price of the inventory item.',
    type: 'decimal',
    format: 'decimal',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Quantity of the inventory item.', default: 0 })
  @Column({ default: 0 })
  quantity: number;
}
