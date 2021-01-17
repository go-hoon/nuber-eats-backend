import { Injectable } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly payments: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private scheduleRegistry: SchedulerRegistry,
  ) {}

  async createPayment(
    owner: User,
    { restaurantId, transactionId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurants.findOne({ id: restaurantId });
      if (!restaurant) {
        return {
          ok: false,
          error: 'No restaurant found',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'You are not allowed to do this',
        };
      }
      await this.payments.save(
        this.payments.create({ user: owner, transactionId, restaurant }),
      );
      return {
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: "Can't create payment",
      };
    }
  }

  async getPayments(owner: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payments.find({ user: owner });
      return { ok: true, payments };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: "Can't get payments",
      };
    }
  }

  @Cron('30 * * * * *', { name: 'myJob' })
  checkForPaymentsC() {
    console.log('checking for payments...(cron)');
    const job = this.scheduleRegistry.getCronJob('myJob');
    console.log(job);
    job.stop();
  }

  @Interval(5000)
  checkForPaymentsI() {
    console.log('checking for payments...(interval)');
  }

  @Timeout(20000)
  afterStart() {
    console.log('Timeout!');
  }
}
