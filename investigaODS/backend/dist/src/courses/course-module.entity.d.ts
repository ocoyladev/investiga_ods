import { BaseEntity } from '../common/entities/base.entity';
import { Course } from './course.entity';
import { Lesson } from '../lessons/lesson.entity';
export declare class CourseModule extends BaseEntity {
    course: Course;
    index: number;
    title: string;
    summary?: string;
    lessons: Lesson[];
}
