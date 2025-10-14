"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigFactory = void 0;
const snake_naming_strategy_1 = require("./snake-naming.strategy");
const typeOrmConfigFactory = async (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    autoLoadEntities: true,
    synchronize: configService.get('DB_SYNC') === 'true',
    logging: configService.get('DB_LOGGING') === 'true',
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
    retryAttempts: 5,
    retryDelay: 3000,
});
exports.typeOrmConfigFactory = typeOrmConfigFactory;
//# sourceMappingURL=typeorm.config.js.map