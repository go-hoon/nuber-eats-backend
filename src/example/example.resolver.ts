import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Example } from './entities/example.entity';

@Resolver(() => Example)
export class ExampleResolver {
  @Query(() => [Example])
  Examples(@Args('veganOnly') veganOnly: boolean): Example[] {
    return [];
  }

  @Mutation(() => Boolean)
  CreateRestaurant(@Args() CreateRestaurantDto: CreateRestaurantDto): boolean {
    console.log(CreateRestaurantDto);
    return true;
  }
}
