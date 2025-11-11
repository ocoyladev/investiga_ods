import { UserRole } from '../user-role.enum';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    role?: UserRole;
}
