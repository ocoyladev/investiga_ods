import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';
export declare class AuditLog extends BaseEntity {
    user?: User | null;
    action: string;
    metadata?: Record<string, unknown> | null;
}
