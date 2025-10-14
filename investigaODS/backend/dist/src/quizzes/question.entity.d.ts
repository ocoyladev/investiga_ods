import { BaseEntity } from '../common/entities/base.entity';
import { Quiz } from './quiz.entity';
import { Option } from './option.entity';
import { Answer } from '../attempts/answer.entity';
export declare enum QuestionType {
    MCQ = "MCQ",
    TRUE_FALSE = "TRUE_FALSE",
    OPEN = "OPEN"
}
export declare class Question extends BaseEntity {
    quiz: Quiz;
    type: QuestionType;
    prompt: string;
    points: number;
    metadata?: Record<string, unknown>;
    options: Option[];
    answers: Answer[];
}
