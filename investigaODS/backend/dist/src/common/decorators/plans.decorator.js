"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePlan = exports.PLAN_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PLAN_KEY = 'plan';
const RequirePlan = (plan) => (0, common_1.SetMetadata)(exports.PLAN_KEY, plan);
exports.RequirePlan = RequirePlan;
//# sourceMappingURL=plans.decorator.js.map