import { Repository } from 'typeorm';
import { MembershipPlan, MembershipPlanCode } from '../plans/membership-plan.entity';
import { Subscription } from './subscription.entity';
export declare class SubscriptionsService {
    private readonly subscriptionsRepository;
    private readonly plansRepository;
    constructor(subscriptionsRepository: Repository<Subscription>, plansRepository: Repository<MembershipPlan>);
    ensureDefaultSubscription(userId: number, planCode: MembershipPlanCode): Promise<Subscription>;
    findActiveSubscription(userId: number): Promise<Subscription | null>;
    upgrade(userId: number, planCode: MembershipPlanCode): Promise<Subscription>;
    cancel(userId: number): Promise<void>;
    private getPlanOrCreate;
    private stripSubscription;
}
