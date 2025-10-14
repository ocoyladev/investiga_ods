import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { Course } from '../courses/course.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { User } from '../users/user.entity';
import { CoursesService } from '../courses/courses.service';
import { ChallengeSubmission } from './challenge-submission.entity';
import { SubmitChallengeDto } from './dto/submit-challenge.dto';
import { UserPoints } from './user-points.entity';
export declare class ChallengesService {
    private readonly challengesRepository;
    private readonly submissionsRepository;
    private readonly coursesRepository;
    private readonly pointsRepository;
    private readonly coursesService;
    constructor(challengesRepository: Repository<Challenge>, submissionsRepository: Repository<ChallengeSubmission>, coursesRepository: Repository<Course>, pointsRepository: Repository<UserPoints>, coursesService: CoursesService);
    createForCourse(courseId: number, dto: CreateChallengeDto, user: User): Promise<Challenge>;
    submit(challengeId: number, user: User, dto: SubmitChallengeDto): Promise<ChallengeSubmission>;
    awardPoints(user: User, courseId: number, points: number): Promise<UserPoints>;
    listUserPoints(userId: number): Promise<UserPoints[]>;
    private stripSubmissionRelations;
    private stripPointsRelations;
}
