import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Example } from './entities/example.entity';
import { ExampleService } from './example.service';

@Resolver(() => Example)
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Query(() => [Example])
  examples(): Promise<Example[]> {
    return this.exampleService.getAll();
  }

  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.exampleService.createRestaurant(createRestaurantDto);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
