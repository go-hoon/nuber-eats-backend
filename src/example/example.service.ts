import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from './dtos/update-restaurant.dto';
import { Example } from './entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example) private readonly examples: Repository<Example>,
  ) {}

  getAll(): Promise<Example[]> {
    return this.examples.find();
  }

  createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Example> {
    const newRestaurant = this.examples.create(createRestaurantDto);
    return this.examples.save(newRestaurant);
  }

  updateRestaurant({ id, data }: UpdateRestaurantDto): Promise<any> {
    return this.examples.update(id, { ...data });
  }
}
