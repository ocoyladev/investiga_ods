import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { MembershipPlan } from '../plans/membership-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, MembershipPlan])],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
