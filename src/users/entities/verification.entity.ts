import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { string } from 'joi';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column(() => String)
  @Field(() => String)
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
