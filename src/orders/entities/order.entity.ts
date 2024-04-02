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

  @Column({ default: 'pending' })
  status: string;

  @Column()
  total: number;

  @OneToMany(type => OrderDetail, detail => detail.order)
  details: OrderDetail[];

  @BeforeInsert()
  calculateTotal(): void {
    this.total = 0
    this.details.forEach(detail => {
      this.total += detail.quantity * detail.price;
    });
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
