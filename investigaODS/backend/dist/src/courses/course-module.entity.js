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
exports.CourseModule = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_entity_1 = require("./course.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
let CourseModule = class CourseModule extends base_entity_1.BaseEntity {
};
exports.CourseModule = CourseModule;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.modules, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], CourseModule.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseModule.prototype, "index", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseModule.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CourseModule.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lesson_entity_1.Lesson, (lesson) => lesson.module),
    __metadata("design:type", Array)
], CourseModule.prototype, "lessons", void 0);
exports.CourseModule = CourseModule = __decorate([
    (0, typeorm_1.Entity)({ name: 'course_modules' })
], CourseModule);
//# sourceMappingURL=course-module.entity.js.map