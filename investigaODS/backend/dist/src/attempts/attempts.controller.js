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
exports.AttemptsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const attempts_service_1 = require("./attempts.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const create_answer_dto_1 = require("./dto/create-answer.dto");
let AttemptsController = class AttemptsController {
    constructor(attemptsService) {
        this.attemptsService = attemptsService;
    }
    async startAttempt(id, user) {
        return this.attemptsService.startAttempt(Number(id), user);
    }
    async answer(id, dto, user) {
        return this.attemptsService.addAnswer(Number(id), user, dto);
    }
    async submit(id, user) {
        return this.attemptsService.submitAttempt(Number(id), user);
    }
    async result(id, user) {
        return this.attemptsService.getResult(Number(id), user);
    }
};
exports.AttemptsController = AttemptsController;
__decorate([
    (0, common_1.Post)('quizzes/:id/attempts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AttemptsController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Post)('attempts/:id/answers'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_answer_dto_1.CreateAnswerDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AttemptsController.prototype, "answer", null);
__decorate([
    (0, common_1.Post)('attempts/:id/submit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AttemptsController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('attempts/:id/result'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AttemptsController.prototype, "result", null);
exports.AttemptsController = AttemptsController = __decorate([
    (0, swagger_1.ApiTags)('Attempts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [attempts_service_1.AttemptsService])
], AttemptsController);
//# sourceMappingURL=attempts.controller.js.map