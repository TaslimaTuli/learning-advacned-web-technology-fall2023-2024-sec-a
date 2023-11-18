import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  itemCode: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  quantity: number;
}
