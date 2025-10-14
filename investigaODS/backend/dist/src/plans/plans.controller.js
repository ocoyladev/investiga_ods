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
exports.PlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plans_service_1 = require("./plans.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const upgrade_subscription_dto_1 = require("../subscriptions/dto/upgrade-subscription.dto");
let PlansController = class PlansController {
    constructor(plansService, subscriptionsService) {
        this.plansService = plansService;
        this.subscriptionsService = subscriptionsService;
    }
    async getPlans() {
        return this.plansService.findAll();
    }
    async getMySubscription(user) {
        return this.subscriptionsService.findActiveSubscription(user.id);
    }
    async upgrade(user, dto) {
        return this.subscriptionsService.upgrade(user.id, dto.planCode);
    }
};
exports.PlansController = PlansController;
__decorate([
    (0, common_1.Get)('plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Get)('me/subscription'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getMySubscription", null);
__decorate([
    (0, common_1.Post)('subscriptions/upgrade'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, upgrade_subscription_dto_1.UpgradeSubscriptionDto]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "upgrade", null);
exports.PlansController = PlansController = __decorate([
    (0, swagger_1.ApiTags)('Plans'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [plans_service_1.PlansService,
        subscriptions_service_1.SubscriptionsService])
], PlansController);
//# sourceMappingURL=plans.controller.js.map