import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userss: Repository<User>,
  ) {}

  async createRestaurant(
    authUser: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    const {} = createRestaurantInput;
    try {
      await this.restaurants.save(
        this.restaurants.create({ ...createRestaurantInput, owner: authUser }),
      );
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: "Can't make the restaurant",
      };
    }
  }
}
