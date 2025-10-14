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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
const subscription_entity_1 = require("./subscription.entity");
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionsRepository, plansRepository) {
        this.subscriptionsRepository = subscriptionsRepository;
        this.plansRepository = plansRepository;
    }
    async ensureDefaultSubscription(userId, planCode) {
        const existing = await this.subscriptionsRepository.findOne({
            where: { user: { id: userId }, status: subscription_entity_1.SubscriptionStatus.ACTIVE },
        });
        if (existing) {
            return existing;
        }
        const plan = await this.getPlanOrCreate(planCode);
        const subscription = this.subscriptionsRepository.create({
            user: { id: userId },
            plan,
            status: subscription_entity_1.SubscriptionStatus.ACTIVE,
            startAt: new Date(),
        });
        const saved = await this.subscriptionsRepository.save(subscription);
        return this.stripSubscription(saved);
    }
    async findActiveSubscription(userId) {
        const subscription = await this.subscriptionsRepository.findOne({
            where: { user: { id: userId }, status: subscription_entity_1.SubscriptionStatus.ACTIVE },
        });
        return subscription ? this.stripSubscription(subscription) : null;
    }
    async upgrade(userId, planCode) {
        const plan = await this.getPlanOrCreate(planCode);
        let subscription = await this.subscriptionsRepository.findOne({
            where: { user: { id: userId }, status: subscription_entity_1.SubscriptionStatus.ACTIVE },
        });
        if (!subscription) {
            subscription = this.subscriptionsRepository.create({
                user: { id: userId },
                plan,
                status: subscription_entity_1.SubscriptionStatus.ACTIVE,
                startAt: new Date(),
            });
        }
        else {
            subscription.plan = plan;
            subscription.startAt = new Date();
            subscription.endAt = undefined;
            subscription.status = subscription_entity_1.SubscriptionStatus.ACTIVE;
        }
        const saved = await this.subscriptionsRepository.save(subscription);
        return this.stripSubscription(saved);
    }
    async cancel(userId) {
        const subscription = await this.findActiveSubscription(userId);
        if (subscription) {
            subscription.status = subscription_entity_1.SubscriptionStatus.CANCELLED;
            subscription.endAt = new Date();
            await this.subscriptionsRepository.save(subscription);
        }
    }
    async getPlanOrCreate(planCode) {
        let plan = await this.plansRepository.findOne({ where: { code: planCode } });
        if (!plan) {
            plan = this.plansRepository.create({
                code: planCode,
                name: planCode === membership_plan_entity_1.MembershipPlanCode.PRO ? 'Pro' : 'Basic',
                features: planCode === membership_plan_entity_1.MembershipPlanCode.PRO ? { live: true } : { live: false },
            });
            plan = await this.plansRepository.save(plan);
        }
        return plan;
    }
    stripSubscription(subscription) {
        if (subscription.user) {
            const { passwordHash, ...user } = subscription.user;
            subscription.user = user;
        }
        return subscription;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_plan_entity_1.MembershipPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map