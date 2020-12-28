import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example) private readonly examples: Repository<Example>,
  ) {}

  getAll(): Promise<Example[]> {
    return this.examples.find();
  }
}
