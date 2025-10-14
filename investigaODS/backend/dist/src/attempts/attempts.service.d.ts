import { Repository } from 'typeorm';
import { Attempt } from './attempt.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { User } from '../users/user.entity';
import { Answer } from './answer.entity';
import { Question } from '../quizzes/question.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Option } from '../quizzes/option.entity';
export declare class AttemptsService {
    private readonly attemptsRepository;
    private readonly quizzesRepository;
    private readonly answersRepository;
    private readonly questionsRepository;
    private readonly optionsRepository;
    constructor(attemptsRepository: Repository<Attempt>, quizzesRepository: Repository<Quiz>, answersRepository: Repository<Answer>, questionsRepository: Repository<Question>, optionsRepository: Repository<Option>);
    startAttempt(quizId: number, user: User): Promise<Attempt>;
    addAnswer(attemptId: number, user: User, dto: CreateAnswerDto): Promise<Answer>;
    submitAttempt(attemptId: number, user: User): Promise<Attempt>;
    getResult(attemptId: number, user: User): Promise<Attempt>;
    private getAttempt;
    private sanitizeAttempt;
}
