import { BaseEntity } from '../common/entities/base.entity';
import { Course } from '../courses/course.entity';
import { Cohort } from '../cohorts/cohort.entity';
export declare class LiveClass extends BaseEntity {
    course?: Course;
    cohort?: Cohort;
    title: string;
    startAt: Date;
    endAt?: Date;
    meetingUrl?: string;
    recordingUrl?: string;
    capacity?: number;
    timezone?: string;
}
