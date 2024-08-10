import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get('')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get('last/:table')
  findLast(@Param('table') table: string) {
    return this.ordersService.findLast(+table as number);
  }

  @Patch('')
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
