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
exports.Subscription = exports.SubscriptionStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "ACTIVE";
    SubscriptionStatus["CANCELLED"] = "CANCELLED";
    SubscriptionStatus["EXPIRED"] = "EXPIRED";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
let Subscription = class Subscription extends base_entity_1.BaseEntity {
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.subscriptions, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Subscription.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => membership_plan_entity_1.MembershipPlan, (plan) => plan.subscriptions, { eager: true }),
    __metadata("design:type", membership_plan_entity_1.MembershipPlan)
], Subscription.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Subscription.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Subscription.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)({ name: 'subscriptions' })
], Subscription);
//# sourceMappingURL=subscription.entity.js.map