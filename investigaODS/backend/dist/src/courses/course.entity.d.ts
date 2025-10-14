import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
import { CourseModule } from '../courses/course-module.entity';
import { Cohort } from '../cohorts/cohort.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { Tag } from '../tags/tag.entity';
import { Certificate } from '../certificates/certificate.entity';
import { LiveClass } from '../live-classes/live-class.entity';
import { Challenge } from '../challenges/challenge.entity';
export declare enum CourseVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
export declare enum CourseModality {
    SELF_PACED = "SELF_PACED",
    GUIDED = "GUIDED"
}
export declare enum CourseTier {
    FREE = "FREE",
    BASIC = "BASIC",
    PRO = "PRO"
}
export declare class Course extends BaseEntity {
    owner: User;
    title: string;
    slug: string;
    summary?: string;
    description?: string;
    thumbnailUrl?: string;
    level?: string;
    language?: string;
    visibility: CourseVisibility;
    modality: CourseModality;
    tierRequired: CourseTier;
    hasCertificate: boolean;
    supportsLive: boolean;
    supportsChallenges: boolean;
    modules: CourseModule[];
    cohorts: Cohort[];
    enrollments: Enrollment[];
    tags: Tag[];
    certificates: Certificate[];
    liveClasses: LiveClass[];
    challenges: Challenge[];
}
