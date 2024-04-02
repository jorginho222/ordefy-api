import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(type => Order, order => order.details, { nullable: true })
  order: Order;
}
