import { AttemptsService } from './attempts.service';
import { User } from '../users/user.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
export declare class AttemptsController {
    private readonly attemptsService;
    constructor(attemptsService: AttemptsService);
    startAttempt(id: number, user: User): Promise<import("./attempt.entity").Attempt>;
    answer(id: number, dto: CreateAnswerDto, user: User): Promise<import("./answer.entity").Answer>;
    submit(id: number, user: User): Promise<import("./attempt.entity").Attempt>;
    result(id: number, user: User): Promise<import("./attempt.entity").Attempt>;
}
