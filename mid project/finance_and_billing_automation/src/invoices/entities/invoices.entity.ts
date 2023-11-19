import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class Invoice {
  @ApiProperty({ description: 'The unique identifier of the invoice.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => [Product],
    description: 'Array of products associated with the invoice.',
  })
  @OneToMany(() => Product, (product) => product.invoice, {
    cascade: ['insert'],
  })
  products: Product[];

  @ApiProperty({
    description: 'Total expense of the invoice.',
    default: 0,
    type: 'decimal',
  })
  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  totalExpense: number;
}
