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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lesson_progress_entity_1 = require("./lesson-progress.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
let ProgressService = class ProgressService {
    constructor(progressRepository, lessonsRepository) {
        this.progressRepository = progressRepository;
        this.lessonsRepository = lessonsRepository;
    }
    async updateProgress(lessonId, user, dto) {
        const lesson = await this.lessonsRepository.findOne({
            where: { id: lessonId },
            relations: ['module', 'module.course'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        let progress = await this.progressRepository.findOne({
            where: { lesson: { id: lessonId }, user: { id: user.id } },
        });
        if (!progress) {
            progress = this.progressRepository.create({
                lesson,
                user,
                progressPct: 0,
                completed: false,
            });
        }
        if (dto.progressPct !== undefined) {
            progress.progressPct = dto.progressPct;
        }
        if (dto.completed !== undefined) {
            progress.completed = dto.completed;
        }
        progress.lastViewedAt = new Date();
        const saved = await this.progressRepository.save(progress);
        return this.stripUser(saved);
    }
    async getCourseProgress(courseId, user) {
        const progress = await this.progressRepository
            .createQueryBuilder('progress')
            .leftJoinAndSelect('progress.lesson', 'lesson')
            .leftJoin('lesson.module', 'module')
            .leftJoin('module.course', 'course')
            .where('course.id = :courseId', { courseId })
            .andWhere('progress.userId = :userId', { userId: user.id })
            .getMany();
        return progress.map((entry) => this.stripUser(entry));
    }
    stripUser(entry) {
        if (entry.user) {
            const { passwordHash, ...user } = entry.user;
            entry.user = user;
        }
        return entry;
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lesson_progress_entity_1.LessonProgress)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map