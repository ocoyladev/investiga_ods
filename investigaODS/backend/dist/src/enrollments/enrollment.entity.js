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
exports.Enrollment = exports.EnrollmentStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const course_entity_1 = require("../courses/course.entity");
const cohort_entity_1 = require("../cohorts/cohort.entity");
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["ACTIVE"] = "ACTIVE";
    EnrollmentStatus["COMPLETED"] = "COMPLETED";
    EnrollmentStatus["DROPPED"] = "DROPPED";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
let Enrollment = class Enrollment {
};
exports.Enrollment = Enrollment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Enrollment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.enrollments, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Enrollment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.enrollments, { eager: true }),
    __metadata("design:type", course_entity_1.Course)
], Enrollment.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cohort_entity_1.Cohort, (cohort) => cohort.enrollments, { eager: true, nullable: true }),
    __metadata("design:type", cohort_entity_1.Cohort)
], Enrollment.prototype, "cohort", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE }),
    __metadata("design:type", String)
], Enrollment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'enrolled_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Enrollment.prototype, "enrolledAt", void 0);
exports.Enrollment = Enrollment = __decorate([
    (0, typeorm_1.Entity)({ name: 'enrollments' })
], Enrollment);
//# sourceMappingURL=enrollment.entity.js.map