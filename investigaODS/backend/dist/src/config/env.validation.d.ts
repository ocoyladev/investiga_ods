declare enum NodeEnv {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    PORT: number;
    NODE_ENV: NodeEnv;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS?: string;
    DB_NAME: string;
    DB_LOGGING: string;
    DB_SYNC: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
