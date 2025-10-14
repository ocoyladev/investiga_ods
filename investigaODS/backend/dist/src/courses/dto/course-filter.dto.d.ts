import { CourseModality, CourseTier } from '../course.entity';
export declare class CourseFilterDto {
    q?: string;
    tag?: string;
    modality?: CourseModality;
    owner?: string;
    tier?: CourseTier;
}
