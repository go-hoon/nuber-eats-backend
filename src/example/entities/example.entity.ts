import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Example {
  @Field(() => String) // 이 field는 String을 반환한다
  name: string;

  @Field(() => Boolean, { nullable: true })
  isGood?: boolean; // nullable이기 때문에 옆에 ?를 붙인다.

  @Field(() => String)
  address: string;

  @Field(() => String)
  ownerNmae: string;
}
