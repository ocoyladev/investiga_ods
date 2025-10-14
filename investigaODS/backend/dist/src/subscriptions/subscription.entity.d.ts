import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
import { MembershipPlan } from '../plans/membership-plan.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
    EXPIRED = "EXPIRED"
}
export declare class Subscription extends BaseEntity {
    user: User;
    plan: MembershipPlan;
    startAt: Date;
    endAt?: Date;
    status: SubscriptionStatus;
}
