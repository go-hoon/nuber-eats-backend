import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {
  CategoryResolver,
  DishResolver,
  RestaurantsResolver,
} from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { CategoryRepository } from './repositories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, User, CategoryRepository, Dish]),
  ],
  providers: [
    RestaurantsService,
    RestaurantsResolver,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}
