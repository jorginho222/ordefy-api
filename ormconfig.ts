import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Order } from './src/orders/entities/order.entity';
import { OrderDetail } from './src/orders/entities/orderDetail.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'ordefy',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [Order, OrderDetail],
  synchronize: true, // it is recommended to set this property to false in production, because this sync functionality can drop all or part of production data
};

export default config;
