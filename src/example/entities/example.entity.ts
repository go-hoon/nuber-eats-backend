import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String) // 이 field는 String을 반환한다
  @Column() // TypeORM Entity를 위한 Column
  @Length(5)
  name: string;

  @Field(() => Boolean, { defaultValue: true }) // GraphQL을 위한 defaultValue 설정
  @Column({ default: true }) // TypeORM을 위한 defaultValue 설정
  @IsOptional() // validation을 위한 것 (값이 주어지지 않으면 나머지 validation을 무시한다.)
  @IsBoolean()
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
