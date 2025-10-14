import { UserRole } from '../user-role.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
}
