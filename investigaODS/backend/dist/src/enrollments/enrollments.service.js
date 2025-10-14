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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("./enrollment.entity");
const courses_service_1 = require("../courses/courses.service");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
const user_role_enum_1 = require("../users/user-role.enum");
let EnrollmentsService = class EnrollmentsService {
    constructor(enrollmentsRepository, coursesService, subscriptionsService) {
        this.enrollmentsRepository = enrollmentsRepository;
        this.coursesService = coursesService;
        this.subscriptionsService = subscriptionsService;
    }
    async enroll(courseId, user) {
        var _a;
        const course = await this.coursesService.findById(courseId);
        const subscription = await this.subscriptionsService.findActiveSubscription(user.id);
        const planCode = (_a = subscription === null || subscription === void 0 ? void 0 : subscription.plan.code) !== null && _a !== void 0 ? _a : membership_plan_entity_1.MembershipPlanCode.BASIC;
        this.coursesService.assertTierAccess(course, planCode);
        const existing = await this.enrollmentsRepository.findOne({
            where: { course: { id: courseId }, user: { id: user.id } },
        });
        if (existing) {
            return this.sanitizeEnrollment(existing);
        }
        const enrollment = this.enrollmentsRepository.create({
            course,
            user,
            status: enrollment_entity_1.EnrollmentStatus.ACTIVE,
            enrolledAt: new Date(),
        });
        const saved = await this.enrollmentsRepository.save(enrollment);
        return this.sanitizeEnrollment(saved);
    }
    async listForUser(userId) {
        const enrollments = await this.enrollmentsRepository.find({ where: { user: { id: userId } } });
        return enrollments.map((enrollment) => this.sanitizeEnrollment(enrollment));
    }
    async listStudents(courseId, user) {
        const course = await this.coursesService.findById(courseId);
        this.ensureInstructorAccess(course.owner.id, user);
        const enrollments = await this.enrollmentsRepository.find({ where: { course: { id: courseId } } });
        return enrollments.map((enrollment) => this.sanitizeEnrollment(enrollment));
    }
    ensureInstructorAccess(ownerId, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN) {
            return;
        }
        if (user.role === user_role_enum_1.UserRole.INSTRUCTOR && user.id === ownerId) {
            return;
        }
        throw new common_1.ForbiddenException('Not allowed');
    }
    async findEnrollment(id) {
        const enrollment = await this.enrollmentsRepository.findOne({ where: { id } });
        if (!enrollment) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        return this.sanitizeEnrollment(enrollment);
    }
    sanitizeEnrollment(enrollment) {
        var _a;
        if (enrollment.user) {
            const { passwordHash, ...user } = enrollment.user;
            enrollment.user = user;
        }
        if ((_a = enrollment.course) === null || _a === void 0 ? void 0 : _a.owner) {
            const { passwordHash, ...owner } = enrollment.course.owner;
            enrollment.course.owner = owner;
        }
        return enrollment;
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        courses_service_1.CoursesService,
        subscriptions_service_1.SubscriptionsService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map