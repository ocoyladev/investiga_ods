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
exports.Lesson = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_module_entity_1 = require("../courses/course-module.entity");
const lesson_progress_entity_1 = require("../progress/lesson-progress.entity");
const quiz_entity_1 = require("../quizzes/quiz.entity");
let Lesson = class Lesson extends base_entity_1.BaseEntity {
};
exports.Lesson = Lesson;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_module_entity_1.CourseModule, (module) => module.lessons, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_module_entity_1.CourseModule)
], Lesson.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lesson.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lesson.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'video_url', nullable: true }),
    __metadata("design:type", String)
], Lesson.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_min', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Lesson.prototype, "durationMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Lesson.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_progress_entity_1.LessonProgress, (progress) => progress.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "progresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, (quiz) => quiz.lesson),
    __metadata("design:type", Array)
], Lesson.prototype, "quizzes", void 0);
exports.Lesson = Lesson = __decorate([
    (0, typeorm_1.Entity)({ name: 'lessons' })
], Lesson);
//# sourceMappingURL=lesson.entity.js.map