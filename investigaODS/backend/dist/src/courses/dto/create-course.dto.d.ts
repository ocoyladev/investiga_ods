import { CourseModality, CourseTier, CourseVisibility } from '../course.entity';
export declare class CreateCourseDto {
    title: string;
    slug?: string;
    summary?: string;
    description?: string;
    thumbnailUrl?: string;
    level?: string;
    language?: string;
    visibility?: CourseVisibility;
    modality?: CourseModality;
    tierRequired?: CourseTier;
    hasCertificate?: boolean;
    supportsLive?: boolean;
    supportsChallenges?: boolean;
    tags?: string[];
}
