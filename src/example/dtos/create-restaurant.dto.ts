import { InputType, OmitType } from '@nestjs/graphql';
import { Example } from '../entities/example.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(Example, ['id'], InputType) {}
