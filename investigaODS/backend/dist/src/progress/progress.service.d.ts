import { Repository } from 'typeorm';
import { LessonProgress } from './lesson-progress.entity';
import { Lesson } from '../lessons/lesson.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { User } from '../users/user.entity';
export declare class ProgressService {
    private readonly progressRepository;
    private readonly lessonsRepository;
    constructor(progressRepository: Repository<LessonProgress>, lessonsRepository: Repository<Lesson>);
    updateProgress(lessonId: number, user: User, dto: UpdateProgressDto): Promise<LessonProgress>;
    getCourseProgress(courseId: number, user: User): Promise<{
        courseId: number;
        totalLessons: number;
        completedLessons: number;
        progressPercentage: number;
        lessonProgress: LessonProgress[];
    }>;
    private stripUser;
}
