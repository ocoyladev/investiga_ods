import { BaseEntity } from '../common/entities/base.entity';
import { Course } from '../courses/course.entity';
import { Lesson } from '../lessons/lesson.entity';
import { ChallengeSubmission } from './challenge-submission.entity';
export declare class Challenge extends BaseEntity {
    course?: Course;
    lesson?: Lesson;
    title: string;
    description?: string;
    points: number;
    rules?: Record<string, unknown>;
    submissions: ChallengeSubmission[];
}
