import { QuizType } from '../quiz.entity';
export declare class CreateQuizDto {
    title: string;
    type?: QuizType;
    passScore?: number;
}
