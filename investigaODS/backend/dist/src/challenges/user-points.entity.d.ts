import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
export declare class UserPoints {
    id: number;
    user: User;
    course?: Course;
    points: number;
}
