import { BaseEntity } from '../common/entities/base.entity';
import { CourseModule } from '../courses/course-module.entity';
import { LessonProgress } from '../progress/lesson-progress.entity';
import { Quiz } from '../quizzes/quiz.entity';
export declare class Lesson extends BaseEntity {
    module: CourseModule;
    index: number;
    title: string;
    content?: string;
    videoUrl?: string;
    durationMin?: number;
    resources?: Record<string, unknown>;
    progresses: LessonProgress[];
    quizzes: Quiz[];
}
