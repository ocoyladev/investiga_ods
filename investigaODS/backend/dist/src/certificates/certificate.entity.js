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
exports.Certificate = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const user_entity_1 = require("../users/user.entity");
const course_entity_1 = require("../courses/course.entity");
const cohort_entity_1 = require("../cohorts/cohort.entity");
let Certificate = class Certificate extends base_entity_1.BaseEntity {
};
exports.Certificate = Certificate;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.certificates, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Certificate.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.certificates, { eager: true }),
    __metadata("design:type", course_entity_1.Course)
], Certificate.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cohort_entity_1.Cohort, (cohort) => cohort.certificates, { eager: true, nullable: true }),
    __metadata("design:type", cohort_entity_1.Cohort)
], Certificate.prototype, "cohort", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Certificate.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pdf_url', nullable: true }),
    __metadata("design:type", String)
], Certificate.prototype, "pdfUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hash_sha256', nullable: true }),
    __metadata("design:type", String)
], Certificate.prototype, "hashSha256", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'issued_at', type: 'datetime' }),
    __metadata("design:type", Date)
], Certificate.prototype, "issuedAt", void 0);
exports.Certificate = Certificate = __decorate([
    (0, typeorm_1.Entity)({ name: 'certificates' })
], Certificate);
//# sourceMappingURL=certificate.entity.js.map