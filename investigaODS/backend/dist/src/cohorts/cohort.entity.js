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
exports.Cohort = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_entity_1 = require("../courses/course.entity");
const enrollment_entity_1 = require("../enrollments/enrollment.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
const live_class_entity_1 = require("../live-classes/live-class.entity");
let Cohort = class Cohort extends base_entity_1.BaseEntity {
};
exports.Cohort = Cohort;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.cohorts, { onDelete: 'CASCADE' }),
    __metadata("design:type", course_entity_1.Course)
], Cohort.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cohort.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Cohort.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Cohort.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Cohort.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (enrollment) => enrollment.cohort),
    __metadata("design:type", Array)
], Cohort.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificate) => certificate.cohort),
    __metadata("design:type", Array)
], Cohort.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => live_class_entity_1.LiveClass, (liveClass) => liveClass.cohort),
    __metadata("design:type", Array)
], Cohort.prototype, "liveClasses", void 0);
exports.Cohort = Cohort = __decorate([
    (0, typeorm_1.Entity)({ name: 'cohorts' })
], Cohort);
//# sourceMappingURL=cohort.entity.js.map