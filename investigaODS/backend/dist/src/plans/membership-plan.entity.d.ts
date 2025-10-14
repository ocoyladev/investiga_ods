import { BaseEntity } from '../common/entities/base.entity';
import { Subscription } from '../subscriptions/subscription.entity';
export declare enum MembershipPlanCode {
    BASIC = "BASIC",
    PRO = "PRO"
}
export declare class MembershipPlan extends BaseEntity {
    code: MembershipPlanCode;
    name: string;
    features?: Record<string, unknown>;
    status: boolean;
    subscriptions: Subscription[];
}
