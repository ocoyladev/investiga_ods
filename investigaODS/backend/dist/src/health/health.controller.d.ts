import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    check(): Promise<{
        app: string;
        db: string;
        error?: undefined;
    } | {
        app: string;
        db: string;
        error: string;
    }>;
    readiness(): Promise<{
        app: string;
        db: string;
        error?: undefined;
    } | {
        app: string;
        db: string;
        error: string;
    }>;
}
