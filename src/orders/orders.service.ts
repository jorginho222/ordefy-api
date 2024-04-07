import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/orderDetail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail) private readonly orderDetailRepository: Repository<OrderDetail>
  ) {
  }

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepository.create(createOrderDto)

    const orderDetails: OrderDetail[] = []
    for (const detail of createOrderDto.details) {
      const newDetail = this.orderDetailRepository.create(detail)
      const orderDetail = await this.orderDetailRepository.save(newDetail)
      orderDetails.push(orderDetail)
    }

    newOrder.details = orderDetails
    return this.orderRepository.save(newOrder)
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['details']
    });
  }

  findLast(table: number) {
    return this.orderRepository.find({
      where: { table: +table },
      order: {
        number: 'DESC'
      },
      take: 1,
      relations: ['details']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(updateOrderDto.id, updateOrderDto)
    return this.orderRepository.findOne({ where: { id: updateOrderDto.id } })
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
