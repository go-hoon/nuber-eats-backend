import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Order>,
  ) {}

  async createOrder(
    customer: User,
    { items, restaurantId }: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    try {
      const restaurant = await this.restaurants.findOne({ id: restaurantId });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }

      const order = await this.orders.save(
        this.orders.create({ customer, restaurant }),
      );
      const items = {};

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: "Can't create an order",
      };
    }
  }
}
