import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const orderRepositoryMock = {
      save: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue({}),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersService,
          useValue: orderRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', () => {
      expect(service.findAll()).resolves.toEqual([]);
    });
  });

  describe('create', () => {
    it('should create an order', () => {
      const newOrder = {
        id: '1',
        table: 1,
        details: [
          {
            id: '1',
            description: 'test',
            price: 1,
            quantity: 1,
          },
        ],
      } as CreateOrderDto;

      expect(service.create(newOrder)).resolves.toEqual(newOrder);
    });
  });
});
