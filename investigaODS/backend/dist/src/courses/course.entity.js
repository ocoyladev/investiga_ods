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
exports.Course = exports.CourseTier = exports.CourseModality = exports.CourseVisibility = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const course_module_entity_1 = require("../courses/course-module.entity");
const cohort_entity_1 = require("../cohorts/cohort.entity");
const enrollment_entity_1 = require("../enrollments/enrollment.entity");
const tag_entity_1 = require("../tags/tag.entity");
const certificate_entity_1 = require("../certificates/certificate.entity");
const live_class_entity_1 = require("../live-classes/live-class.entity");
const challenge_entity_1 = require("../challenges/challenge.entity");
var CourseVisibility;
(function (CourseVisibility) {
    CourseVisibility["PUBLIC"] = "PUBLIC";
    CourseVisibility["PRIVATE"] = "PRIVATE";
})(CourseVisibility || (exports.CourseVisibility = CourseVisibility = {}));
var CourseModality;
(function (CourseModality) {
    CourseModality["SELF_PACED"] = "SELF_PACED";
    CourseModality["GUIDED"] = "GUIDED";
})(CourseModality || (exports.CourseModality = CourseModality = {}));
var CourseTier;
(function (CourseTier) {
    CourseTier["FREE"] = "FREE";
    CourseTier["BASIC"] = "BASIC";
    CourseTier["PRO"] = "PRO";
})(CourseTier || (exports.CourseTier = CourseTier = {}));
let Course = class Course extends base_entity_1.BaseEntity {
};
exports.Course = Course;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.courses, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Course.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false, nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Course.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseVisibility, default: CourseVisibility.PUBLIC }),
    __metadata("design:type", String)
], Course.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseModality, default: CourseModality.SELF_PACED }),
    __metadata("design:type", String)
], Course.prototype, "modality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CourseTier, default: CourseTier.FREE }),
    __metadata("design:type", String)
], Course.prototype, "tierRequired", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "hasCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "supportsLive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Course.prototype, "supportsChallenges", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => course_module_entity_1.CourseModule, (module) => module.course, { cascade: true }),
    __metadata("design:type", Array)
], Course.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cohort_entity_1.Cohort, (cohort) => cohort.course),
    __metadata("design:type", Array)
], Course.prototype, "cohorts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => enrollment_entity_1.Enrollment, (enrollment) => enrollment.course),
    __metadata("design:type", Array)
], Course.prototype, "enrollments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.courses, { cascade: true }),
    (0, typeorm_1.JoinTable)({ name: 'course_tags' }),
    __metadata("design:type", Array)
], Course.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => certificate_entity_1.Certificate, (certificate) => certificate.course),
    __metadata("design:type", Array)
], Course.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => live_class_entity_1.LiveClass, (liveClass) => liveClass.course),
    __metadata("design:type", Array)
], Course.prototype, "liveClasses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_entity_1.Challenge, (challenge) => challenge.course),
    __metadata("design:type", Array)
], Course.prototype, "challenges", void 0);
exports.Course = Course = __decorate([
    (0, typeorm_1.Entity)({ name: 'courses' })
], Course);
//# sourceMappingURL=course.entity.js.map