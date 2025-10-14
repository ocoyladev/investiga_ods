import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';
export declare class AuditService {
    private readonly auditRepository;
    constructor(auditRepository: Repository<AuditLog>);
    record(action: string, metadata?: Record<string, unknown>, userId?: number): Promise<void>;
}
