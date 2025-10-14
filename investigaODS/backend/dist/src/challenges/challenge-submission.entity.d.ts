import { Challenge } from './challenge.entity';
import { User } from '../users/user.entity';
export declare enum ChallengeSubmissionStatus {
    SUBMITTED = "SUBMITTED",
    REVIEWING = "REVIEWING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class ChallengeSubmission {
    id: number;
    challenge: Challenge;
    user: User;
    artifactUrl?: string;
    score: number;
    status: ChallengeSubmissionStatus;
}
