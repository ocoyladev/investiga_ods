import { Attempt } from './attempt.entity';
import { Question } from '../quizzes/question.entity';
import { Option } from '../quizzes/option.entity';
export declare class Answer {
    id: number;
    attempt: Attempt;
    question: Question;
    option?: Option;
    openText?: string;
    isCorrect?: boolean;
    awardedPoints?: number;
}
