"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const plans_decorator_1 = require("../decorators/plans.decorator");
const membership_plan_entity_1 = require("../../plans/membership-plan.entity");
const subscriptions_service_1 = require("../../subscriptions/subscriptions.service");
const user_role_enum_1 = require("../../users/user-role.enum");
let PlansGuard = class PlansGuard {
    constructor(reflector, subscriptionsService) {
        this.reflector = reflector;
        this.subscriptionsService = subscriptionsService;
    }
    async canActivate(context) {
        const requiredPlan = this.reflector.getAllAndOverride(plans_decorator_1.PLAN_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredPlan) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Authentication required');
        }
        if (user.role === user_role_enum_1.UserRole.INSTRUCTOR || user.role === user_role_enum_1.UserRole.ADMIN) {
            return true;
        }
        const subscription = await this.subscriptionsService.findActiveSubscription(user.id);
        if (!subscription) {
            throw new common_1.ForbiddenException('Active subscription required');
        }
        if (requiredPlan === membership_plan_entity_1.MembershipPlanCode.BASIC) {
            return true;
        }
        if (requiredPlan === membership_plan_entity_1.MembershipPlanCode.PRO && subscription.plan.code === membership_plan_entity_1.MembershipPlanCode.PRO) {
            return true;
        }
        throw new common_1.ForbiddenException('Upgrade plan required');
    }
};
exports.PlansGuard = PlansGuard;
exports.PlansGuard = PlansGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        subscriptions_service_1.SubscriptionsService])
], PlansGuard);
//# sourceMappingURL=plans.guard.js.map