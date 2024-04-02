import { CreateOrderDetailDto } from './create-order-detail.dto';

export class CreateOrderDto {
  id: string;
  details: CreateOrderDetailDto[];
}
