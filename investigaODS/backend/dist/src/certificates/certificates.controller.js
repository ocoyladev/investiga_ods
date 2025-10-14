"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const certificates_service_1 = require("./certificates.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const user_role_enum_1 = require("../users/user-role.enum");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const issue_certificate_dto_1 = require("./dto/issue-certificate.dto");
let CertificatesController = class CertificatesController {
    constructor(certificatesService) {
        this.certificatesService = certificatesService;
    }
    async issue(id, dto, user) {
        return this.certificatesService.issue(Number(id), dto, user);
    }
    async myCertificates(user) {
        return this.certificatesService.listForUser(user.id);
    }
    async verify(serial) {
        return this.certificatesService.verify(serial);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, common_1.Post)('courses/:id/certificates/issue'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.INSTRUCTOR, user_role_enum_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, issue_certificate_dto_1.IssueCertificateDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "issue", null);
__decorate([
    (0, common_1.Get)('me/certificates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "myCertificates", null);
__decorate([
    (0, common_1.Get)('certificates/verify'),
    __param(0, (0, common_1.Query)('serial')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "verify", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Certificates'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map