import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { Cohort } from '../cohorts/cohort.entity';
export declare enum EnrollmentStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED"
}
export declare class Enrollment {
    id: number;
    user: User;
    course: Course;
    cohort?: Cohort;
    status: EnrollmentStatus;
    enrolledAt: Date;
}
