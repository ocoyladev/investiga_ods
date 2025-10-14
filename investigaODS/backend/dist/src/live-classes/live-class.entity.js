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
exports.LiveClass = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../common/entities/base.entity");
const course_entity_1 = require("../courses/course.entity");
const cohort_entity_1 = require("../cohorts/cohort.entity");
let LiveClass = class LiveClass extends base_entity_1.BaseEntity {
};
exports.LiveClass = LiveClass;
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, (course) => course.liveClasses, { nullable: true }),
    __metadata("design:type", course_entity_1.Course)
], LiveClass.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cohort_entity_1.Cohort, (cohort) => cohort.liveClasses, { nullable: true }),
    __metadata("design:type", cohort_entity_1.Cohort)
], LiveClass.prototype, "cohort", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LiveClass.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_at', type: 'datetime' }),
    __metadata("design:type", Date)
], LiveClass.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_at', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], LiveClass.prototype, "endAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'meeting_url', nullable: true }),
    __metadata("design:type", String)
], LiveClass.prototype, "meetingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'recording_url', nullable: true }),
    __metadata("design:type", String)
], LiveClass.prototype, "recordingUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], LiveClass.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LiveClass.prototype, "timezone", void 0);
exports.LiveClass = LiveClass = __decorate([
    (0, typeorm_1.Entity)({ name: 'live_classes' })
], LiveClass);
//# sourceMappingURL=live-class.entity.js.map