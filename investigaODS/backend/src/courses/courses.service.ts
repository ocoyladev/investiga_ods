import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course, CourseTier } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../users/user.entity';
import { CourseModule } from './course-module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from '../lessons/lesson.entity';
import { CourseFilterDto } from './dto/course-filter.dto';
import { Tag } from '../tags/tag.entity';
import { MembershipPlanCode } from '../plans/membership-plan.entity';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(CourseModule)
    private readonly modulesRepository: Repository<CourseModule>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findAll(filters: CourseFilterDto) {
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

  async create(owner: User, dto: CreateCourseDto) {
    const course = this.coursesRepository.create({
      ...dto,
      owner,
      tags: await this.resolveTags(dto.tags),
    });
    const saved = await this.coursesRepository.save(course);
    return this.stripCourseOwner(saved);
  }

  async findById(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['owner', 'tags'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return this.stripCourseOwner(course);
  }

  async update(courseId: number, dto: UpdateCourseDto, user: User) {
    const course = await this.findById(courseId);
    this.assertCanManageCourse(course, user);
    Object.assign(course, dto);
    if (dto.tags) {
      course.tags = await this.resolveTags(dto.tags);
    }
    const saved = await this.coursesRepository.save(course);
    return this.stripCourseOwner(saved);
  }

  async remove(courseId: number, user: User) {
    const course = await this.findById(courseId);
    this.assertCanManageCourse(course, user);
    await this.coursesRepository.remove(course);
  }

  async getOutline(courseId: number, user: User) {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['modules', 'modules.lessons', 'owner'],
    });
    if (!course) {
      throw new NotFoundException('Course not found');
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

  async createModule(courseId: number, dto: CreateModuleDto, user: User) {
    const course = await this.findById(courseId);
    this.assertCanManageCourse(course, user);
    const module = this.modulesRepository.create({ course, ...dto });
    return this.modulesRepository.save(module);
  }

  async createLesson(moduleId: number, dto: CreateLessonDto, user: User) {
    const module = await this.modulesRepository.findOne({
      where: { id: moduleId },
      relations: ['course', 'course.owner'],
    });
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    this.assertCanManageCourse(module.course, user);
    const lesson = this.lessonsRepository.create({ module, ...dto });
    return this.lessonsRepository.save(lesson);
  }

  assertTierAccess(course: Course, subscriptionPlan?: MembershipPlanCode | CourseTier) {
    const tier = course.tierRequired;
    if (tier === CourseTier.FREE) {
      return;
    }
    if (tier === CourseTier.BASIC) {
      if (subscriptionPlan === MembershipPlanCode.BASIC || subscriptionPlan === MembershipPlanCode.PRO) {
        return;
      }
      throw new ForbiddenException('Course requires BASIC plan');
    }
    if (tier === CourseTier.PRO && subscriptionPlan !== MembershipPlanCode.PRO) {
      throw new ForbiddenException('Course requires PRO plan');
    }
  }

  assertCanManageCourse(course: Course, user: User) {
    if (user.role === UserRole.ADMIN) {
      return;
    }
    if (user.role === UserRole.INSTRUCTOR && course.owner.id === user.id) {
      return;
    }
    throw new ForbiddenException('Not allowed to manage this course');
  }

  private assertCanView(course: Course, user: User) {
    if (course.visibility === 'PUBLIC') {
      return;
    }
    this.assertCanManageCourse(course, user);
  }

  private async resolveTags(tagNames?: string[]) {
    if (!tagNames || tagNames.length === 0) {
      return [];
    }
    const tags: Tag[] = [];
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

  private stripCourseOwner(course: Course) {
    if (course?.owner) {
      const { passwordHash, ...owner } = course.owner as any;
      course.owner = owner as User;
    }
    return course;
  }
}
