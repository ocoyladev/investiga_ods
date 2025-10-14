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
exports.Challenge = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_entity_1 = require("../courses/course.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
const challenge_submission_entity_1 = require("./challenge-submission.entity");
let Challenge = class Challenge extends base_entity_1.BaseEntity {
};
exports.Challenge = Challenge;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.challenges, { nullable: true }),
    __metadata("design:type", course_entity_1.Course)
], Challenge.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, { nullable: true }),
    __metadata("design:type", lesson_entity_1.Lesson)
], Challenge.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Challenge.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Challenge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Challenge.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Challenge.prototype, "rules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_submission_entity_1.ChallengeSubmission, (submission) => submission.challenge),
    __metadata("design:type", Array)
], Challenge.prototype, "submissions", void 0);
exports.Challenge = Challenge = __decorate([
    (0, typeorm_1.Entity)({ name: 'challenges' })
], Challenge);
//# sourceMappingURL=challenge.entity.js.map