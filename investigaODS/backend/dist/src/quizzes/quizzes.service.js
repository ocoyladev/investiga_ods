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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
const courses_service_1 = require("../courses/courses.service");
let QuizzesService = class QuizzesService {
    constructor(quizzesRepository, lessonsRepository, coursesService) {
        this.quizzesRepository = quizzesRepository;
        this.lessonsRepository = lessonsRepository;
        this.coursesService = coursesService;
    }
    async createForLesson(lessonId, dto, user) {
        const lesson = await this.lessonsRepository.findOne({
            where: { id: lessonId },
            relations: ['module', 'module.course', 'module.course.owner'],
        });
        if (!lesson) {
            throw new common_1.NotFoundException('Lesson not found');
        }
        this.coursesService.assertCanManageCourse(lesson.module.course, user);
        const quiz = this.quizzesRepository.create({
            ...dto,
            lesson,
            course: lesson.module.course,
        });
        const saved = await this.quizzesRepository.save(quiz);
        return this.stripSensitive(saved);
    }
    async findOne(id) {
        const quiz = await this.quizzesRepository.findOne({
            where: { id },
            relations: ['lesson', 'questions', 'questions.options'],
        });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        return this.stripSensitive(quiz);
    }
    stripSensitive(quiz) {
        var _a;
        if ((_a = quiz.course) === null || _a === void 0 ? void 0 : _a.owner) {
            const { passwordHash, ...owner } = quiz.course.owner;
            quiz.course.owner = owner;
        }
        return quiz;
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        courses_service_1.CoursesService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map