import { PlansService } from './plans.service';
import { User } from '../users/user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { UpgradeSubscriptionDto } from '../subscriptions/dto/upgrade-subscription.dto';
export declare class PlansController {
    private readonly plansService;
    private readonly subscriptionsService;
    constructor(plansService: PlansService, subscriptionsService: SubscriptionsService);
    getPlans(): Promise<import("./membership-plan.entity").MembershipPlan[]>;
    getMySubscription(user: User): Promise<import("../entities").Subscription | null>;
    upgrade(user: User, dto: UpgradeSubscriptionDto): Promise<import("../entities").Subscription>;
}
