import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseFilterDto } from './dto/course-filter.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { User } from '../users/user.entity';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    list(filters: CourseFilterDto): Promise<import("./course.entity").Course[]>;
    getById(id: number): Promise<import("./course.entity").Course>;
    outline(id: number, user: User): Promise<import("./course.entity").Course>;
    create(user: User, dto: CreateCourseDto): Promise<import("./course.entity").Course>;
    update(id: number, user: User, dto: UpdateCourseDto): Promise<import("./course.entity").Course>;
    remove(id: number, user: User): Promise<{
        success: boolean;
    }>;
    createModule(id: number, user: User, dto: CreateModuleDto): Promise<import("./course-module.entity").CourseModule>;
    createLesson(id: number, user: User, dto: CreateLessonDto): Promise<import("../entities").Lesson>;
}
