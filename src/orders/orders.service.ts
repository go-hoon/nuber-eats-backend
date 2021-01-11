import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/restaurants/entities/dish.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orders: Repository<Order>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItems: Repository<OrderItem>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
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

      for (const item of items) {
        const dish = await this.dishes.findOne({ id: item.dishId });
        if (!dish) {
          return {
            ok: false,
            error: 'Dish not found',
          };
        }
        console.log(`Dish price: ${dish.price}`);
        for (const itemOption of item.options) {
          const dishOption = dish.options.find(
            (dishOption) => dishOption.name === itemOption.name,
          );
          if (dishOption) {
            if (dishOption.extra) {
              console.log(`USD +${dishOption.extra}`);
            } else {
              const disOptionChoice = dishOption.choices.find(
                (optionChoice) => optionChoice.name === itemOption.choice,
              );
              if (disOptionChoice.extra) {
                console.log(`USD +${disOptionChoice.extra}`);
              }
            }
          }
        }

        // await this.orderItems.save(
        //   this.orderItems.create({ dish, options: item.options }),
        // );
      }
      // const order = await this.orders.save(
      //   this.orders.create({ customer, restaurant }),
      // );
      // const items = {};

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
