import { EnrollmentsService } from './enrollments.service';
import { User } from '../users/user.entity';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    enroll(id: number, user: User): Promise<import("./enrollment.entity").Enrollment>;
    myEnrollments(user: User): Promise<import("./enrollment.entity").Enrollment[]>;
    students(id: number, user: User): Promise<import("./enrollment.entity").Enrollment[]>;
}
