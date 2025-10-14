"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const challenges_controller_1 = require("./challenges.controller");
const challenges_service_1 = require("./challenges.service");
const challenge_entity_1 = require("./challenge.entity");
const challenge_submission_entity_1 = require("./challenge-submission.entity");
const user_points_entity_1 = require("./user-points.entity");
const course_entity_1 = require("../courses/course.entity");
const courses_module_1 = require("../courses/courses.module");
const plans_guard_1 = require("../common/guards/plans.guard");
const subscriptions_module_1 = require("../subscriptions/subscriptions.module");
const roles_guard_1 = require("../common/guards/roles.guard");
let ChallengesModule = class ChallengesModule {
};
exports.ChallengesModule = ChallengesModule;
exports.ChallengesModule = ChallengesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([challenge_entity_1.Challenge, challenge_submission_entity_1.ChallengeSubmission, user_points_entity_1.UserPoints, course_entity_1.Course]),
            courses_module_1.CoursesModule,
            subscriptions_module_1.SubscriptionsModule,
        ],
        controllers: [challenges_controller_1.ChallengesController],
        providers: [challenges_service_1.ChallengesService, plans_guard_1.PlansGuard, roles_guard_1.RolesGuard],
    })
], ChallengesModule);
//# sourceMappingURL=challenges.module.js.map