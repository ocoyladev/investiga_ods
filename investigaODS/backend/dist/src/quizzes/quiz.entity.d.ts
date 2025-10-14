import { BaseEntity } from '../common/entities/base.entity';
import { Course } from '../courses/course.entity';
import { Lesson } from '../lessons/lesson.entity';
import { Question } from './question.entity';
import { Attempt } from '../attempts/attempt.entity';
export declare enum QuizType {
    QUIZ = "QUIZ",
    EXAM = "EXAM"
}
export declare class Quiz extends BaseEntity {
    course?: Course;
    lesson?: Lesson;
    title: string;
    type: QuizType;
    passScore?: number;
    attemptLimit?: number;
    timeLimitSec?: number;
    weight?: number;
    questions: Question[];
    attempts: Attempt[];
}
