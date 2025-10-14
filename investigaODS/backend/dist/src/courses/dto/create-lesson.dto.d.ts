export declare class CreateLessonDto {
    index: number;
    title: string;
    content?: string;
    videoUrl?: string;
    durationMin?: number;
    resources?: Record<string, unknown>;
}
