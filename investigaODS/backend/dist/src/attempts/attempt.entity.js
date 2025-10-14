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
exports.Attempt = exports.AttemptStatus = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const quiz_entity_1 = require("../quizzes/quiz.entity");
const user_entity_1 = require("../users/user.entity");
const answer_entity_1 = require("./answer.entity");
var AttemptStatus;
(function (AttemptStatus) {
    AttemptStatus["IN_PROGRESS"] = "IN_PROGRESS";
    AttemptStatus["SUBMITTED"] = "SUBMITTED";
    AttemptStatus["GRADED"] = "GRADED";
})(AttemptStatus || (exports.AttemptStatus = AttemptStatus = {}));
let Attempt = class Attempt extends base_entity_1.BaseEntity {
};
exports.Attempt = Attempt;
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.Quiz, (quiz) => quiz.attempts, { eager: true }),
    __metadata("design:type", quiz_entity_1.Quiz)
], Attempt.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.attempts, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Attempt.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Attempt.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submitted_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Attempt.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Attempt.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: AttemptStatus, default: AttemptStatus.IN_PROGRESS }),
    __metadata("design:type", String)
], Attempt.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.Answer, (answer) => answer.attempt, { cascade: true }),
    __metadata("design:type", Array)
], Attempt.prototype, "answers", void 0);
exports.Attempt = Attempt = __decorate([
    (0, typeorm_1.Entity)({ name: 'attempts' })
], Attempt);
//# sourceMappingURL=attempt.entity.js.map