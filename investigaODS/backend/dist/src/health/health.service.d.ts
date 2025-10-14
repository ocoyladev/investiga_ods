import { DataSource } from 'typeorm';
export declare class HealthService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getHealth(): Promise<{
        app: string;
        db: string;
        error?: undefined;
    } | {
        app: string;
        db: string;
        error: string;
    }>;
    getReadiness(): Promise<{
        app: string;
        db: string;
        error?: undefined;
    } | {
        app: string;
        db: string;
        error: string;
    }>;
}
