import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.invoice, {
    cascade: ['insert'],
  })
  products: Product[];

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  totalExpense: number;
}
