import { MembershipPlanCode } from '../../plans/membership-plan.entity';
export declare const PLAN_KEY = "plan";
export declare const RequirePlan: (plan: MembershipPlanCode) => import("@nestjs/common").CustomDecorator<string>;
