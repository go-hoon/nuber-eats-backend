import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String) // 이 field는 String을 반환한다
  @Column() // TypeORM Entity를 위한 Column
  name: string;

  @Field(() => Boolean, { nullable: true })
  @Column()
  isGood?: boolean; // nullable이기 때문에 옆에 ?를 붙인다.

  @Field(() => String)
  @Column()
  address: string;

  @Field(() => String)
  @Column()
  ownerNmae: string;

  @Field(() => String)
  @Column()
  categoryName: string;
}
