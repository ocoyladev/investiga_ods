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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
const course_module_entity_1 = require("./course-module.entity");
const lesson_entity_1 = require("../lessons/lesson.entity");
const tag_entity_1 = require("../tags/tag.entity");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
const user_role_enum_1 = require("../users/user-role.enum");
let CoursesService = class CoursesService {
    constructor(coursesRepository, modulesRepository, lessonsRepository, tagsRepository) {
        this.coursesRepository = coursesRepository;
        this.modulesRepository = modulesRepository;
        this.lessonsRepository = lessonsRepository;
        this.tagsRepository = tagsRepository;
    }
    async findAll(filters) {
        const qb = this.coursesRepository
            .createQueryBuilder('course')
            .leftJoinAndSelect('course.tags', 'tag')
            .leftJoinAndSelect('course.owner', 'owner')
            .where('course.visibility = :visibility', { visibility: 'PUBLIC' });
        if (filters.q) {
            qb.andWhere('(course.title LIKE :q OR course.summary LIKE :q)', { q: `%${filters.q}%` });
        }
        if (filters.tag) {
            qb.andWhere('tag.name = :tag', { tag: filters.tag });
        }
        if (filters.modality) {
            qb.andWhere('course.modality = :modality', { modality: filters.modality });
        }
        if (filters.owner) {
            qb.andWhere('owner.email = :owner', { owner: filters.owner });
        }
        if (filters.tier) {
            qb.andWhere('course.tierRequired = :tier', { tier: filters.tier });
        }
        const courses = await qb.getMany();
        return courses.map((course) => this.stripCourseOwner(course));
    }
    async create(owner, dto) {
        const course = this.coursesRepository.create({
            ...dto,
            owner,
            tags: await this.resolveTags(dto.tags),
        });
        const saved = await this.coursesRepository.save(course);
        return this.stripCourseOwner(saved);
    }
    async findById(id) {
        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ['owner', 'tags'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return this.stripCourseOwner(course);
    }
    async update(courseId, dto, user) {
        const course = await this.findById(courseId);
        this.assertCanManageCourse(course, user);
        Object.assign(course, dto);
        if (dto.tags) {
            course.tags = await this.resolveTags(dto.tags);
        }
        const saved = await this.coursesRepository.save(course);
        return this.stripCourseOwner(saved);
    }
    async remove(courseId, user) {
        const course = await this.findById(courseId);
        this.assertCanManageCourse(course, user);
        await this.coursesRepository.remove(course);
    }
    async getOutline(courseId, user) {
        const course = await this.coursesRepository.findOne({
            where: { id: courseId },
            relations: ['modules', 'modules.lessons', 'owner'],
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        this.assertCanView(course, user);
        if (course.modules) {
            course.modules = course.modules.sort((a, b) => a.index - b.index);
            course.modules.forEach((module) => {
                if (module.lessons) {
                    module.lessons = module.lessons.sort((a, b) => a.index - b.index);
                }
            });
        }
        return this.stripCourseOwner(course);
    }
    async createModule(courseId, dto, user) {
        const course = await this.findById(courseId);
        this.assertCanManageCourse(course, user);
        const module = this.modulesRepository.create({ course, ...dto });
        return this.modulesRepository.save(module);
    }
    async createLesson(moduleId, dto, user) {
        const module = await this.modulesRepository.findOne({
            where: { id: moduleId },
            relations: ['course', 'course.owner'],
        });
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        this.assertCanManageCourse(module.course, user);
        const lesson = this.lessonsRepository.create({ module, ...dto });
        return this.lessonsRepository.save(lesson);
    }
    assertTierAccess(course, subscriptionPlan) {
        const tier = course.tierRequired;
        if (tier === course_entity_1.CourseTier.FREE) {
            return;
        }
        if (tier === course_entity_1.CourseTier.BASIC) {
            if (subscriptionPlan === membership_plan_entity_1.MembershipPlanCode.BASIC || subscriptionPlan === membership_plan_entity_1.MembershipPlanCode.PRO) {
                return;
            }
            throw new common_1.ForbiddenException('Course requires BASIC plan');
        }
        if (tier === course_entity_1.CourseTier.PRO && subscriptionPlan !== membership_plan_entity_1.MembershipPlanCode.PRO) {
            throw new common_1.ForbiddenException('Course requires PRO plan');
        }
    }
    assertCanManageCourse(course, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN) {
            return;
        }
        if (user.role === user_role_enum_1.UserRole.INSTRUCTOR && course.owner.id === user.id) {
            return;
        }
        throw new common_1.ForbiddenException('Not allowed to manage this course');
    }
    assertCanView(course, user) {
        if (course.visibility === 'PUBLIC') {
            return;
        }
        this.assertCanManageCourse(course, user);
    }
    async resolveTags(tagNames) {
        if (!tagNames || tagNames.length === 0) {
            return [];
        }
        const tags = [];
        for (const name of tagNames) {
            let tag = await this.tagsRepository.findOne({ where: { name } });
            if (!tag) {
                tag = this.tagsRepository.create({ name });
                tag = await this.tagsRepository.save(tag);
            }
            tags.push(tag);
        }
        return tags;
    }
    stripCourseOwner(course) {
        if (course === null || course === void 0 ? void 0 : course.owner) {
            const { passwordHash, ...owner } = course.owner;
            course.owner = owner;
        }
        return course;
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __param(1, (0, typeorm_1.InjectRepository)(course_module_entity_1.CourseModule)),
    __param(2, (0, typeorm_1.InjectRepository)(lesson_entity_1.Lesson)),
    __param(3, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map