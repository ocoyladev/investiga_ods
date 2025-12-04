import { Repository } from 'typeorm';
import { Course, CourseTier } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { User } from '../users/user.entity';
import { CourseModule } from './course-module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from '../lessons/lesson.entity';
import { CourseFilterDto } from './dto/course-filter.dto';
import { Tag } from '../tags/tag.entity';
import { MembershipPlanCode } from '../plans/membership-plan.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
export declare class CoursesService {
    private readonly coursesRepository;
    private readonly modulesRepository;
    private readonly lessonsRepository;
    private readonly tagsRepository;
    private readonly enrollmentsRepository;
    constructor(coursesRepository: Repository<Course>, modulesRepository: Repository<CourseModule>, lessonsRepository: Repository<Lesson>, tagsRepository: Repository<Tag>, enrollmentsRepository: Repository<Enrollment>);
    findAll(filters: CourseFilterDto): Promise<Course[]>;
    findAllForAdmin(): Promise<Course[]>;
    findMyCourses(user: User): Promise<Course[]>;
    create(owner: User, dto: CreateCourseDto): Promise<Course>;
    findById(id: number): Promise<Course>;
    update(courseId: number, dto: UpdateCourseDto, user: User): Promise<Course>;
    remove(courseId: number, user: User): Promise<void>;
    getOutline(courseId: number, user: User): Promise<Course>;
    getCourseStats(courseId: number, user: User): Promise<{
        courseId: number;
        students: {
            total: number;
            active: number;
            completed: number;
        };
        content: {
            modules: number;
            lessons: number;
        };
        rating: number;
    }>;
    createModule(courseId: number, dto: CreateModuleDto, user: User): Promise<CourseModule>;
    updateModule(moduleId: number, dto: UpdateModuleDto, user: User): Promise<CourseModule>;
    removeModule(moduleId: number, user: User): Promise<void>;
    createLesson(moduleId: number, dto: CreateLessonDto, user: User): Promise<Lesson>;
    updateLesson(lessonId: number, dto: UpdateLessonDto, user: User): Promise<Lesson>;
    removeLesson(lessonId: number, user: User): Promise<void>;
    assertTierAccess(course: Course, subscriptionPlan?: MembershipPlanCode | CourseTier): void;
    assertCanManageCourse(course: Course, user: User): void;
    private assertCanView;
    private resolveTags;
    private stripCourseOwner;
    private generateSlug;
}
