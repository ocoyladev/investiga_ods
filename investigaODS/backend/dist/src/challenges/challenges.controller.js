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
exports.ChallengesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const challenges_service_1 = require("./challenges.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_enum_1 = require("../users/user-role.enum");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const create_challenge_dto_1 = require("./dto/create-challenge.dto");
const submit_challenge_dto_1 = require("./dto/submit-challenge.dto");
const plans_decorator_1 = require("../common/decorators/plans.decorator");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
const plans_guard_1 = require("../common/guards/plans.guard");
let ChallengesController = class ChallengesController {
    constructor(challengesService) {
        this.challengesService = challengesService;
    }
    async create(courseId, dto, user) {
        return this.challengesService.createForCourse(Number(courseId), dto, user);
    }
    async submit(id, dto, user) {
        return this.challengesService.submit(Number(id), user, dto);
    }
    async points(user) {
        return this.challengesService.listUserPoints(user.id);
    }
};
exports.ChallengesController = ChallengesController;
__decorate([
    (0, common_1.Post)('courses/:courseId/challenges'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, plans_guard_1.PlansGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.INSTRUCTOR, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_challenge_dto_1.CreateChallengeDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('challenges/:id/submissions'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, submit_challenge_dto_1.SubmitChallengeDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('me/points'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ChallengesController.prototype, "points", null);
exports.ChallengesController = ChallengesController = __decorate([
    (0, swagger_1.ApiTags)('Challenges'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, plans_guard_1.PlansGuard),
    (0, plans_decorator_1.RequirePlan)(membership_plan_entity_1.MembershipPlanCode.PRO),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [challenges_service_1.ChallengesService])
], ChallengesController);
//# sourceMappingURL=challenges.controller.js.map