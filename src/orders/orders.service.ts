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

  findLast() {
    return this.orderRepository.find({
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


  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
