"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const configuration_1 = require("../config/configuration");
const snake_naming_strategy_1 = require("./snake-naming.strategy");
const entities = require("../entities");
const config = (0, configuration_1.default)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    logging: config.database.logging,
    synchronize: false,
    entities: Object.values(entities),
    migrations: ['dist/database/migrations/*.js'],
    namingStrategy: new snake_naming_strategy_1.SnakeNamingStrategy(),
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=data-source.js.map