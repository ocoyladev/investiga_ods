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
exports.MembershipPlan = exports.MembershipPlanCode = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const subscription_entity_1 = require("../subscriptions/subscription.entity");
var MembershipPlanCode;
(function (MembershipPlanCode) {
    MembershipPlanCode["BASIC"] = "BASIC";
    MembershipPlanCode["PRO"] = "PRO";
})(MembershipPlanCode || (exports.MembershipPlanCode = MembershipPlanCode = {}));
let MembershipPlan = class MembershipPlan extends base_entity_1.BaseEntity {
};
exports.MembershipPlan = MembershipPlan;
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MembershipPlanCode, unique: true }),
    __metadata("design:type", String)
], MembershipPlan.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MembershipPlan.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MembershipPlan.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], MembershipPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subscription_entity_1.Subscription, (subscription) => subscription.plan),
    __metadata("design:type", Array)
], MembershipPlan.prototype, "subscriptions", void 0);
exports.MembershipPlan = MembershipPlan = __decorate([
    (0, typeorm_1.Entity)({ name: 'membership_plans' })
], MembershipPlan);
//# sourceMappingURL=membership-plan.entity.js.map