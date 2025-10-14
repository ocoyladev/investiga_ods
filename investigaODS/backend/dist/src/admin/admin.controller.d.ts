import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user-role.enum';
import { UpdateUserDto } from '../users/dto/update-user.dto';
export declare class AdminController {
    private readonly usersService;
    constructor(usersService: UsersService);
    listUsers(): Promise<{
        email: string;
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
        role: UserRole;
        courses: import("../entities").Course[];
        enrollments: import("../entities").Enrollment[];
        subscriptions: import("../entities").Subscription[];
        attempts: import("../entities").Attempt[];
        certificates: import("../entities").Certificate[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUser(id: number, dto: UpdateUserDto): Promise<{
        email: string;
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
        role: UserRole;
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
