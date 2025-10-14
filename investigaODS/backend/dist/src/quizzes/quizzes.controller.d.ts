import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { User } from '../users/user.entity';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(id: number, dto: CreateQuizDto, user: User): Promise<import("./quiz.entity").Quiz>;
    getQuiz(id: number): Promise<import("./quiz.entity").Quiz>;
}
