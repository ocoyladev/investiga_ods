import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
export declare class AuthService {
    private readonly usersService;
    private readonly subscriptionsService;
    private readonly jwtService;
    private readonly configService;
    private readonly refreshCookieName;
    constructor(usersService: UsersService, subscriptionsService: SubscriptionsService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
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
    validateUser(email: string, password: string): Promise<User>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
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
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
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
    getRefreshCookieOptions(): {
        httpOnly: boolean;
        sameSite: "lax";
        secure: boolean;
        maxAge: number;
        path: string;
    };
    stripPassword(user: User): {
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
    private generateTokens;
    private parseDurationMs;
    getRefreshCookieName(): string;
}
