import { BaseEntity } from '../common/entities/base.entity';
import { UserRole } from './user-role.enum';
import { Course } from '../courses/course.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Subscription } from '../subscriptions/subscription.entity';
import { Attempt } from '../attempts/attempt.entity';
import { Certificate } from '../certificates/certificate.entity';
export declare class User extends BaseEntity {
    email: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role: UserRole;
    courses: Course[];
    enrollments: Enrollment[];
    subscriptions: Subscription[];
    attempts: Attempt[];
    certificates: Certificate[];
}
