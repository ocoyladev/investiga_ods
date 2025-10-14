import { ProgressService } from './progress.service';
import { User } from '../users/user.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    updateProgress(id: number, user: User, dto: UpdateProgressDto): Promise<import("./lesson-progress.entity").LessonProgress>;
    courseProgress(courseId: number, user: User): Promise<import("./lesson-progress.entity").LessonProgress[]>;
}
