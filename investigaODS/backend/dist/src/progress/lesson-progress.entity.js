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
exports.LessonProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
let LessonProgress = class LessonProgress {
};
exports.LessonProgress = LessonProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LessonProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], LessonProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lesson_entity_1.Lesson, (lesson) => lesson.progresses, { eager: true }),
    __metadata("design:type", lesson_entity_1.Lesson)
], LessonProgress.prototype, "lesson", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], LessonProgress.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'progress_pct', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], LessonProgress.prototype, "progressPct", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_viewed_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], LessonProgress.prototype, "lastViewedAt", void 0);
exports.LessonProgress = LessonProgress = __decorate([
    (0, typeorm_1.Entity)({ name: 'lesson_progress' })
], LessonProgress);
//# sourceMappingURL=lesson-progress.entity.js.map