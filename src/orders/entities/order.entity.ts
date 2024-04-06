import { BeforeInsert, Column, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({generated: 'increment'})
  number: number;

  @Column({ default: new Date() })
  issueDate: Date;

  @Column()
  table: number;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  netAmount: number;

  @Column()
  total: number;

  @OneToMany(type => OrderDetail, detail => detail.order)
  details: OrderDetail[];

  @BeforeInsert()
  calculateTotals(): void {
    this.netAmount = 0
    this.details.forEach(detail => {
      this.netAmount += detail.quantity * detail.price;
      this.total = this.netAmount * 1.21;
    });
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
