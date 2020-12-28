import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Example } from './entities/example.entity';
import { ExampleService } from './example.service';

@Resolver(() => Example)
export class ExampleResolver {
  constructor(private readonly exampleService: ExampleService) {}

  @Query(() => [Example])
  Examples(): Promise<Example[]> {
    return this.exampleService.getAll();
  }

  @Mutation(() => Boolean)
  CreateRestaurant(@Args() CreateRestaurantDto: CreateRestaurantDto): boolean {
    console.log(CreateRestaurantDto);
    return true;
  }
}
