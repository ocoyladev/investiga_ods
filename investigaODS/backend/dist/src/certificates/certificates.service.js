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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const certificate_entity_1 = require("./certificate.entity");
const courses_service_1 = require("../courses/courses.service");
const users_service_1 = require("../users/users.service");
const cohort_entity_1 = require("../cohorts/cohort.entity");
const crypto_1 = require("crypto");
let CertificatesService = class CertificatesService {
    constructor(certificatesRepository, cohortsRepository, coursesService, usersService) {
        this.certificatesRepository = certificatesRepository;
        this.cohortsRepository = cohortsRepository;
        this.coursesService = coursesService;
        this.usersService = usersService;
    }
    async issue(courseId, dto, issuer) {
        const course = await this.coursesService.findById(courseId);
        this.coursesService.assertCanManageCourse(course, issuer);
        const student = await this.usersService.findById(dto.userId);
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const cohort = dto.cohortId
            ? await this.cohortsRepository.findOne({ where: { id: Number(dto.cohortId) } })
            : undefined;
        const certificate = this.certificatesRepository.create({
            course,
            user: student,
            cohort: cohort !== null && cohort !== void 0 ? cohort : undefined,
            pdfUrl: dto.pdfUrl,
            serial: (0, crypto_1.randomUUID)(),
            issuedAt: new Date(),
        });
        const saved = await this.certificatesRepository.save(certificate);
        return this.stripRelations(saved);
    }
    async listForUser(userId) {
        const certificates = await this.certificatesRepository.find({ where: { user: { id: userId } } });
        return certificates.map((certificate) => this.stripRelations(certificate));
    }
    async verify(serial) {
        const certificate = await this.certificatesRepository.findOne({ where: { serial } });
        if (!certificate) {
            throw new common_1.NotFoundException('Certificate not found');
        }
        return this.stripRelations(certificate);
    }
    stripRelations(certificate) {
        var _a;
        if (certificate.user) {
            const { passwordHash, ...user } = certificate.user;
            certificate.user = user;
        }
        if ((_a = certificate.course) === null || _a === void 0 ? void 0 : _a.owner) {
            const { passwordHash, ...owner } = certificate.course.owner;
            certificate.course.owner = owner;
        }
        return certificate;
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(certificate_entity_1.Certificate)),
    __param(1, (0, typeorm_1.InjectRepository)(cohort_entity_1.Cohort)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        courses_service_1.CoursesService,
        users_service_1.UsersService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map