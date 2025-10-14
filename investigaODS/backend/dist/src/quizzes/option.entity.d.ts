import { Question } from './question.entity';
export declare class Option {
    id: number;
    question: Question;
    text: string;
    isCorrect: boolean;
    explanation?: string;
}
