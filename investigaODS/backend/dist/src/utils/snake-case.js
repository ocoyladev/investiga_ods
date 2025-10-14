"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = snakeCase;
function snakeCase(input) {
    return input
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
}
//# sourceMappingURL=snake-case.js.map