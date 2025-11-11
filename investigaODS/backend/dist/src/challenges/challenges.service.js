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
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const challenge_entity_1 = require("./challenge.entity");
const course_entity_1 = require("../courses/course.entity");
const courses_service_1 = require("../courses/courses.service");
const challenge_submission_entity_1 = require("./challenge-submission.entity");
const user_points_entity_1 = require("./user-points.entity");
let ChallengesService = class ChallengesService {
    constructor(challengesRepository, submissionsRepository, coursesRepository, pointsRepository, coursesService) {
        this.challengesRepository = challengesRepository;
        this.submissionsRepository = submissionsRepository;
        this.coursesRepository = coursesRepository;
        this.pointsRepository = pointsRepository;
        this.coursesService = coursesService;
    }
    async createForCourse(courseId, dto, user) {
        var _a;
        const course = await this.coursesRepository.findOne({ where: { id: courseId }, relations: ['owner'] });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        this.coursesService.assertCanManageCourse(course, user);
        const challenge = this.challengesRepository.create({
            course,
            title: dto.title,
            description: dto.description,
            points: (_a = dto.points) !== null && _a !== void 0 ? _a : 0,
            rules: dto.rules,
        });
        const saved = await this.challengesRepository.save(challenge);
        return this.stripSubmissionRelations(saved);
    }
    async submit(challengeId, user, dto) {
        var _a, _b;
        const challenge = await this.challengesRepository.findOne({ where: { id: challengeId }, relations: ['course'] });
        if (!challenge) {
            throw new common_1.NotFoundException('Challenge not found');
        }
        const submission = this.submissionsRepository.create({
            challenge,
            user,
            artifactUrl: dto.artifactUrl,
            status: challenge_submission_entity_1.ChallengeSubmissionStatus.SUBMITTED,
        });
        const saved = await this.submissionsRepository.save(submission);
        const pointsToAward = (_a = challenge.points) !== null && _a !== void 0 ? _a : 0;
        if (pointsToAward > 0 && ((_b = challenge.course) === null || _b === void 0 ? void 0 : _b.id)) {
            await this.awardPoints(user, challenge.course.id, pointsToAward);
        }
        return this.stripSubmissionRelations(saved);
    }
    async awardPoints(user, courseId, points) {
        let userPoints = await this.pointsRepository.findOne({ where: { user: { id: user.id }, course: { id: courseId } } });
        if (!userPoints) {
            userPoints = this.pointsRepository.create({ user, course: { id: courseId }, points: 0 });
        }
        userPoints.points += points;
        const saved = await this.pointsRepository.save(userPoints);
        return this.stripPointsRelations(saved);
    }
    async listUserPoints(userId) {
        const points = await this.pointsRepository.find({ where: { user: { id: userId } } });
        return points.map((entry) => this.stripPointsRelations(entry));
    }
    stripSubmissionRelations(entity) {
        var _a;
        if (entity.user) {
            const { passwordHash, ...user } = entity.user;
            entity.user = user;
        }
        if ((_a = entity.course) === null || _a === void 0 ? void 0 : _a.owner) {
            const { passwordHash, ...owner } = entity.course.owner;
            entity.course.owner = owner;
        }
        return entity;
    }
    stripPointsRelations(entry) {
        return this.stripSubmissionRelations(entry);
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(challenge_entity_1.Challenge)),
    __param(1, (0, typeorm_1.InjectRepository)(challenge_submission_entity_1.ChallengeSubmission)),
    __param(2, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(3, (0, typeorm_1.InjectRepository)(user_points_entity_1.UserPoints)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        courses_service_1.CoursesService])
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map