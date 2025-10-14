"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return ({
        port: parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000', 10),
        nodeEnv: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development',
        jwt: {
            accessSecret: (_c = process.env.JWT_ACCESS_SECRET) !== null && _c !== void 0 ? _c : 'change-this',
            accessExpiresIn: (_d = process.env.JWT_ACCESS_EXPIRES) !== null && _d !== void 0 ? _d : '15m',
            refreshSecret: (_e = process.env.JWT_REFRESH_SECRET) !== null && _e !== void 0 ? _e : 'change-this-too',
            refreshExpiresIn: (_f = process.env.JWT_REFRESH_EXPIRES) !== null && _f !== void 0 ? _f : '7d',
        },
        database: {
            host: (_g = process.env.DB_HOST) !== null && _g !== void 0 ? _g : 'localhost',
            port: parseInt((_h = process.env.DB_PORT) !== null && _h !== void 0 ? _h : '3306', 10),
            username: (_j = process.env.DB_USER) !== null && _j !== void 0 ? _j : 'root',
            password: (_k = process.env.DB_PASS) !== null && _k !== void 0 ? _k : '',
            name: (_l = process.env.DB_NAME) !== null && _l !== void 0 ? _l : 'investiga_ods',
            logging: ((_m = process.env.DB_LOGGING) !== null && _m !== void 0 ? _m : 'false') === 'true',
            synchronize: ((_o = process.env.DB_SYNC) !== null && _o !== void 0 ? _o : 'false') === 'true',
        },
    });
};
//# sourceMappingURL=configuration.js.map