import { User } from '../users/user.entity';
import { Lesson } from '../lessons/lesson.entity';
export declare class LessonProgress {
    id: number;
    user: User;
    lesson: Lesson;
    completed: boolean;
    progressPct: number;
    lastViewedAt?: Date;
}
