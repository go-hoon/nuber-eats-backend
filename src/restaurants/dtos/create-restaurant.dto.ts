import { InputType, ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, [
  'id',
  'category',
  'owner',
  'createdAt',
  'updatedAt',
]) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
