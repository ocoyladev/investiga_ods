import { ChallengesService } from './challenges.service';
import { User } from '../users/user.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { SubmitChallengeDto } from './dto/submit-challenge.dto';
export declare class ChallengesController {
    private readonly challengesService;
    constructor(challengesService: ChallengesService);
    create(courseId: number, dto: CreateChallengeDto, user: User): Promise<import("./challenge.entity").Challenge>;
    submit(id: number, dto: SubmitChallengeDto, user: User): Promise<import("./challenge-submission.entity").ChallengeSubmission>;
    points(user: User): Promise<import("./user-points.entity").UserPoints[]>;
}
