import { BaseEntity } from '../common/entities/base.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { User } from '../users/user.entity';
import { Answer } from './answer.entity';
export declare enum AttemptStatus {
    IN_PROGRESS = "IN_PROGRESS",
    SUBMITTED = "SUBMITTED",
    GRADED = "GRADED"
}
export declare class Attempt extends BaseEntity {
    quiz: Quiz;
    user: User;
    startedAt: Date;
    submittedAt?: Date;
    score: number;
    status: AttemptStatus;
    answers: Answer[];
}
