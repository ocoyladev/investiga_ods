import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
export declare class EnrollmentsService {
    private readonly enrollmentsRepository;
    private readonly coursesService;
    private readonly subscriptionsService;
    constructor(enrollmentsRepository: Repository<Enrollment>, coursesService: CoursesService, subscriptionsService: SubscriptionsService);
    enroll(courseId: number, user: User): Promise<Enrollment>;
    listForUser(userId: number): Promise<Enrollment[]>;
    listStudents(courseId: number, user: User): Promise<Enrollment[]>;
    private ensureInstructorAccess;
    findEnrollment(id: number): Promise<Enrollment>;
    private sanitizeEnrollment;
}
