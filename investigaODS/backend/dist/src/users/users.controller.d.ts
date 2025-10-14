import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<{
        email: string;
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
        role: import("./user-role.enum").UserRole;
        courses: import("../entities").Course[];
        enrollments: import("../entities").Enrollment[];
        subscriptions: import("../entities").Subscription[];
        attempts: import("../entities").Attempt[];
        certificates: import("../entities").Certificate[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProfile(user: User, dto: UpdateUserDto): Promise<{
        email: string;
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
        role: import("./user-role.enum").UserRole;
        courses: import("../entities").Course[];
        enrollments: import("../entities").Enrollment[];
        subscriptions: import("../entities").Subscription[];
        attempts: import("../entities").Attempt[];
        certificates: import("../entities").Certificate[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
