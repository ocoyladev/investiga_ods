"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attempts_controller_1 = require("./attempts.controller");
const attempts_service_1 = require("./attempts.service");
const attempt_entity_1 = require("./attempt.entity");
const quiz_entity_1 = require("../quizzes/quiz.entity");
const answer_entity_1 = require("./answer.entity");
const question_entity_1 = require("../quizzes/question.entity");
const option_entity_1 = require("../quizzes/option.entity");
let AttemptsModule = class AttemptsModule {
};
exports.AttemptsModule = AttemptsModule;
exports.AttemptsModule = AttemptsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attempt_entity_1.Attempt, quiz_entity_1.Quiz, answer_entity_1.Answer, question_entity_1.Question, option_entity_1.Option])],
        controllers: [attempts_controller_1.AttemptsController],
        providers: [attempts_service_1.AttemptsService],
        exports: [attempts_service_1.AttemptsService],
    })
], AttemptsModule);
//# sourceMappingURL=attempts.module.js.map