import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from './invoices.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty({ description: 'The unique identifier of the product.' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Description of the product.' })
  @Column()
  description: string;

  @ApiProperty({ description: 'The ID of the associated invoice.' })
  @Column()
  invoiceId: number;

  @ApiProperty({
    description: 'Amount of the product.',
    type: 'decimal',
    format: 'decimal',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    type: () => Invoice,
    description: 'Invoice associated with the product.',
  })
  @ManyToOne(() => Invoice, (invoice) => invoice.products)
  invoice: Invoice;
}
