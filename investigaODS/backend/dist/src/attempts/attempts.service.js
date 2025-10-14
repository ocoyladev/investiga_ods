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
exports.AttemptsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attempt_entity_1 = require("./attempt.entity");
const quiz_entity_1 = require("../quizzes/quiz.entity");
const answer_entity_1 = require("./answer.entity");
const question_entity_1 = require("../quizzes/question.entity");
const option_entity_1 = require("../quizzes/option.entity");
const user_role_enum_1 = require("../users/user-role.enum");
let AttemptsService = class AttemptsService {
    constructor(attemptsRepository, quizzesRepository, answersRepository, questionsRepository, optionsRepository) {
        this.attemptsRepository = attemptsRepository;
        this.quizzesRepository = quizzesRepository;
        this.answersRepository = answersRepository;
        this.questionsRepository = questionsRepository;
        this.optionsRepository = optionsRepository;
    }
    async startAttempt(quizId, user) {
        const quiz = await this.quizzesRepository.findOne({ where: { id: quizId }, relations: ['questions'] });
        if (!quiz) {
            throw new common_1.NotFoundException('Quiz not found');
        }
        if (quiz.attemptLimit) {
            const count = await this.attemptsRepository.count({
                where: { quiz: { id: quizId }, user: { id: user.id } },
            });
            if (count >= quiz.attemptLimit) {
                throw new common_1.ForbiddenException('Attempt limit reached');
            }
        }
        const attempt = this.attemptsRepository.create({
            quiz,
            user,
            startedAt: new Date(),
            status: attempt_entity_1.AttemptStatus.IN_PROGRESS,
        });
        const saved = await this.attemptsRepository.save(attempt);
        return this.sanitizeAttempt(saved);
    }
    async addAnswer(attemptId, user, dto) {
        const attempt = await this.getAttempt(attemptId, user);
        if (attempt.status !== attempt_entity_1.AttemptStatus.IN_PROGRESS) {
            throw new common_1.ForbiddenException('Attempt already submitted');
        }
        const question = await this.questionsRepository.findOne({ where: { id: dto.questionId }, relations: ['quiz'] });
        if (!question || question.quiz.id !== attempt.quiz.id) {
            throw new common_1.ForbiddenException('Question not in quiz');
        }
        let answer = await this.answersRepository.findOne({
            where: { attempt: { id: attemptId }, question: { id: dto.questionId } },
        });
        if (!answer) {
            answer = this.answersRepository.create({ attempt, question });
        }
        if (dto.optionId) {
            const option = await this.optionsRepository.findOne({ where: { id: dto.optionId } });
            if (!option) {
                throw new common_1.NotFoundException('Option not found');
            }
            answer.option = option;
            answer.isCorrect = option.isCorrect;
            answer.awardedPoints = option.isCorrect ? question.points : 0;
        }
        if (dto.openText !== undefined) {
            answer.openText = dto.openText;
        }
        const saved = await this.answersRepository.save(answer);
        return saved;
    }
    async submitAttempt(attemptId, user) {
        var _a;
        const attempt = await this.getAttempt(attemptId, user, ['answers', 'answers.question', 'answers.option']);
        if (attempt.status !== attempt_entity_1.AttemptStatus.IN_PROGRESS) {
            throw new common_1.ForbiddenException('Attempt already submitted');
        }
        let score = 0;
        for (const answer of attempt.answers) {
            if (answer.awardedPoints) {
                score += answer.awardedPoints;
            }
            else if (answer.option && answer.option.isCorrect) {
                score += answer.question.points;
                answer.isCorrect = true;
                answer.awardedPoints = answer.question.points;
            }
            else if (answer.isCorrect) {
                score += (_a = answer.awardedPoints) !== null && _a !== void 0 ? _a : 0;
            }
        }
        attempt.score = score;
        attempt.status = attempt_entity_1.AttemptStatus.SUBMITTED;
        attempt.submittedAt = new Date();
        await this.attemptsRepository.save(attempt);
        await this.answersRepository.save(attempt.answers);
        return this.sanitizeAttempt(attempt);
    }
    async getResult(attemptId, user) {
        const attempt = await this.getAttempt(attemptId, user, ['answers', 'answers.question', 'answers.option']);
        return this.sanitizeAttempt(attempt);
    }
    async getAttempt(id, user, relations = []) {
        const attempt = await this.attemptsRepository.findOne({
            where: { id },
            relations: Array.from(new Set(['user', ...relations])),
        });
        if (!attempt) {
            throw new common_1.NotFoundException('Attempt not found');
        }
        if (attempt.user.id !== user.id && user.role !== user_role_enum_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Not allowed to access attempt');
        }
        return attempt;
    }
    sanitizeAttempt(attempt) {
        if (attempt.user) {
            const { passwordHash, ...user } = attempt.user;
            attempt.user = user;
        }
        return attempt;
    }
};
exports.AttemptsService = AttemptsService;
exports.AttemptsService = AttemptsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attempt_entity_1.Attempt)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(2, (0, typeorm_1.InjectRepository)(answer_entity_1.Answer)),
    __param(3, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(4, (0, typeorm_1.InjectRepository)(option_entity_1.Option)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AttemptsService);
//# sourceMappingURL=attempts.service.js.map