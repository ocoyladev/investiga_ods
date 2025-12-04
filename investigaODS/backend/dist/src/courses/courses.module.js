"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
const course_entity_1 = require("./course.entity");
const course_module_entity_1 = require("./course-module.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
const tag_entity_1 = require("../tags/tag.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
const enrollment_entity_1 = require("../enrollments/enrollment.entity");
let CoursesModule = class CoursesModule {
};
exports.CoursesModule = CoursesModule;
exports.CoursesModule = CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([course_entity_1.Course, course_module_entity_1.CourseModule, lesson_entity_1.Lesson, tag_entity_1.Tag, enrollment_entity_1.Enrollment])],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService, roles_guard_1.RolesGuard],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);
//# sourceMappingURL=courses.module.js.map