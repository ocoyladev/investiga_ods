import { BaseEntity } from '../common/entities/base.entity';
import { Course } from '../courses/course.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Certificate } from '../certificates/certificate.entity';
import { LiveClass } from '../live-classes/live-class.entity';
export declare class Cohort extends BaseEntity {
    course: Course;
    name: string;
    startAt?: Date;
    endAt?: Date;
    capacity?: number;
    enrollments: Enrollment[];
    certificates: Certificate[];
    liveClasses: LiveClass[];
}
