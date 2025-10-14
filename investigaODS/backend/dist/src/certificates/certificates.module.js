"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const certificates_controller_1 = require("./certificates.controller");
const certificates_service_1 = require("./certificates.service");
const certificate_entity_1 = require("./certificate.entity");
const courses_module_1 = require("../courses/courses.module");
const users_module_1 = require("../users/users.module");
const cohort_entity_1 = require("../cohorts/cohort.entity");
const roles_guard_1 = require("../common/guards/roles.guard");
let CertificatesModule = class CertificatesModule {
};
exports.CertificatesModule = CertificatesModule;
exports.CertificatesModule = CertificatesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([certificate_entity_1.Certificate, cohort_entity_1.Cohort]), courses_module_1.CoursesModule, users_module_1.UsersModule],
        controllers: [certificates_controller_1.CertificatesController],
        providers: [certificates_service_1.CertificatesService, roles_guard_1.RolesGuard],
        exports: [certificates_service_1.CertificatesService],
    })
], CertificatesModule);
//# sourceMappingURL=certificates.module.js.map