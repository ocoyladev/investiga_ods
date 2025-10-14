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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveClassesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const live_class_entity_1 = require("./live-class.entity");
const course_entity_1 = require("../courses/course.entity");
const courses_service_1 = require("../courses/courses.service");
let LiveClassesService = class LiveClassesService {
    constructor(liveClassesRepository, coursesRepository, coursesService) {
        this.liveClassesRepository = liveClassesRepository;
        this.coursesRepository = coursesRepository;
        this.coursesService = coursesService;
    }
    async createForCourse(courseId, dto, user) {
        const course = await this.coursesRepository.findOne({ where: { id: courseId }, relations: ['owner'] });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        this.coursesService.assertCanManageCourse(course, user);
        const liveClass = this.liveClassesRepository.create({
            course,
            title: dto.title,
            startAt: new Date(dto.startAt),
            endAt: dto.endAt ? new Date(dto.endAt) : undefined,
            meetingUrl: dto.meetingUrl,
            capacity: dto.capacity,
            timezone: dto.timezone,
        });
        const saved = await this.liveClassesRepository.save(liveClass);
        return this.stripCourseOwner(saved);
    }
    async listForCourse(courseId) {
        const liveClasses = await this.liveClassesRepository.find({ where: { course: { id: courseId } } });
        return liveClasses.map((liveClass) => this.stripCourseOwner(liveClass));
    }
    stripCourseOwner(liveClass) {
        var _a;
        if ((_a = liveClass.course) === null || _a === void 0 ? void 0 : _a.owner) {
            const { passwordHash, ...owner } = liveClass.course.owner;
            liveClass.course.owner = owner;
        }
        return liveClass;
    }
};
exports.LiveClassesService = LiveClassesService;
exports.LiveClassesService = LiveClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(live_class_entity_1.LiveClass)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        courses_service_1.CoursesService])
], LiveClassesService);
//# sourceMappingURL=live-classes.service.js.map