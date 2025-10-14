import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { Cohort } from '../cohorts/cohort.entity';
export declare class Certificate extends BaseEntity {
    user: User;
    course: Course;
    cohort?: Cohort;
    serial: string;
    pdfUrl?: string;
    hashSha256?: string;
    issuedAt: Date;
}
