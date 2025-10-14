import { LiveClassesService } from './live-classes.service';
import { User } from '../users/user.entity';
import { CreateLiveClassDto } from './dto/create-live-class.dto';
export declare class LiveClassesController {
    private readonly liveClassesService;
    constructor(liveClassesService: LiveClassesService);
    create(courseId: number, dto: CreateLiveClassDto, user: User): Promise<import("./live-class.entity").LiveClass>;
    list(courseId: number): Promise<import("./live-class.entity").LiveClass[]>;
}
