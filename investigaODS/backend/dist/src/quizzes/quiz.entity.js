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
exports.Quiz = exports.QuizType = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_entity_1 = require("../courses/course.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
const question_entity_1 = require("./question.entity");
const attempt_entity_1 = require("../attempts/attempt.entity");
var QuizType;
(function (QuizType) {
    QuizType["QUIZ"] = "QUIZ";
    QuizType["EXAM"] = "EXAM";
})(QuizType || (exports.QuizType = QuizType = {}));
let Quiz = class Quiz extends base_entity_1.BaseEntity {
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, { nullable: true }),
    __metadata("design:type", course_entity_1.Course)
], Quiz.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.quizzes, { nullable: true }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Quiz.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: QuizType, default: QuizType.QUIZ }),
    __metadata("design:type", String)
], Quiz.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pass_score', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "passScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'attempt_limit', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "attemptLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_limit_sec', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "timeLimitSec", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Quiz.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.quiz, { cascade: true }),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attempt_entity_1.Attempt, (attempt) => attempt.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "attempts", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)({ name: 'quizzes' })
], Quiz);
//# sourceMappingURL=quiz.entity.js.map