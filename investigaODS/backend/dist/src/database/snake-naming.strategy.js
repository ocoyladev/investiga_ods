"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeNamingStrategy = void 0;
const typeorm_1 = require("typeorm");
const snake_case_1 = require("../utils/snake-case");
class SnakeNamingStrategy extends typeorm_1.DefaultNamingStrategy {
    columnName(propertyName, customName, embeddedPrefixes) {
        return (0, snake_case_1.snakeCase)([...embeddedPrefixes, customName !== null && customName !== void 0 ? customName : propertyName].join('_'));
    }
    relationName(propertyName) {
        return (0, snake_case_1.snakeCase)(propertyName);
    }
    tableName(targetName, userSpecifiedName) {
        return (0, snake_case_1.snakeCase)(userSpecifiedName !== null && userSpecifiedName !== void 0 ? userSpecifiedName : targetName);
    }
    joinColumnName(relationName, referencedColumnName) {
        return (0, snake_case_1.snakeCase)(`${relationName}_${referencedColumnName}`);
    }
    joinTableName(firstTableName, secondTableName, firstPropertyName) {
        return (0, snake_case_1.snakeCase)(`${firstTableName}_${firstPropertyName}_${secondTableName}`);
    }
    joinTableColumnName(tableName, propertyName, columnName) {
        return (0, snake_case_1.snakeCase)(`${tableName}_${columnName !== null && columnName !== void 0 ? columnName : propertyName}`);
    }
}
exports.SnakeNamingStrategy = SnakeNamingStrategy;
//# sourceMappingURL=snake-naming.strategy.js.map