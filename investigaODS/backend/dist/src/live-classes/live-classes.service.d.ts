import { Repository } from 'typeorm';
import { LiveClass } from './live-class.entity';
import { Course } from '../courses/course.entity';
import { CreateLiveClassDto } from './dto/create-live-class.dto';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/user.entity';
export declare class LiveClassesService {
    private readonly liveClassesRepository;
    private readonly coursesRepository;
    private readonly coursesService;
    constructor(liveClassesRepository: Repository<LiveClass>, coursesRepository: Repository<Course>, coursesService: CoursesService);
    createForCourse(courseId: number, dto: CreateLiveClassDto, user: User): Promise<LiveClass>;
    listForCourse(courseId: number): Promise<LiveClass[]>;
    private stripCourseOwner;
}
