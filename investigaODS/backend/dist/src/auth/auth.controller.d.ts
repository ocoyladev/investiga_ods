import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
        user: {
            email: string;
            firstName?: string;
            lastName?: string;
            avatarUrl?: string;
            role: import("../users/user-role.enum").UserRole;
            courses: import("../entities").Course[];
            enrollments: import("../entities").Enrollment[];
            subscriptions: import("../entities").Subscription[];
            attempts: import("../entities").Attempt[];
            certificates: import("../entities").Certificate[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            email: string;
            firstName?: string;
            lastName?: string;
            avatarUrl?: string;
            role: import("../users/user-role.enum").UserRole;
            courses: import("../entities").Course[];
            enrollments: import("../entities").Enrollment[];
            subscriptions: import("../entities").Subscription[];
            attempts: import("../entities").Attempt[];
            certificates: import("../entities").Certificate[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
        user: {
            email: string;
            firstName?: string;
            lastName?: string;
            avatarUrl?: string;
            role: import("../users/user-role.enum").UserRole;
            courses: import("../entities").Course[];
            enrollments: import("../entities").Enrollment[];
            subscriptions: import("../entities").Subscription[];
            attempts: import("../entities").Attempt[];
            certificates: import("../entities").Certificate[];
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(res: Response, user: User): Promise<{
        success: boolean;
        userId: number;
    }>;
}
