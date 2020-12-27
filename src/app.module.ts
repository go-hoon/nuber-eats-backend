import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ExampleModule } from './example/example.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 어플리케이션의 어느곳이나 접근 할 수 있다.
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true, // TypeORM이 database에 연결할 때, 현재 상태를 migration 함
      logging: true, // console에 logging하는 옵션
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
