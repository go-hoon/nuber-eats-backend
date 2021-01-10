import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, User, Category])],
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}
