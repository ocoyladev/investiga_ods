import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { Lesson } from '../lessons/lesson.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { User } from '../users/user.entity';
import { CoursesService } from '../courses/courses.service';
export declare class QuizzesService {
    private readonly quizzesRepository;
    private readonly lessonsRepository;
    private readonly coursesService;
    constructor(quizzesRepository: Repository<Quiz>, lessonsRepository: Repository<Lesson>, coursesService: CoursesService);
    createForLesson(lessonId: number, dto: CreateQuizDto, user: User): Promise<Quiz>;
    findOne(id: number): Promise<Quiz>;
    private stripSensitive;
}
