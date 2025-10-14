declare const _default: () => {
    port: number;
    nodeEnv: string;
    jwt: {
        accessSecret: string;
        accessExpiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
        logging: boolean;
        synchronize: boolean;
    };
};
export default _default;
