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

  @Column({type: 'real', default: '0'})
  netAmount: string;

  @Column({type: 'real', default: '0'})
  total: string;

  @OneToMany(type => OrderDetail, detail => detail.order)
  details: OrderDetail[];

  @BeforeInsert()
  calculateTotals(): void {
    this.netAmount = '0'
    this.details.forEach(detail => {
      this.netAmount += detail.quantity * detail.price;
      this.total = (Number(this.netAmount) * 1.21).toString();
    });
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
