"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = require("./config/configuration");
const env_validation_1 = require("./config/env.validation");
const typeorm_config_1 = require("./database/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const plans_module_1 = require("./plans/plans.module");
const courses_module_1 = require("./courses/courses.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const progress_module_1 = require("./progress/progress.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const attempts_module_1 = require("./attempts/attempts.module");
const certificates_module_1 = require("./certificates/certificates.module");
const admin_module_1 = require("./admin/admin.module");
const audit_module_1 = require("./audit/audit.module");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
const chat_module_1 = require("./chat/chat.module");
const live_classes_module_1 = require("./live-classes/live-classes.module");
const challenges_module_1 = require("./challenges/challenges.module");
const health_module_1 = require("./health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validate: env_validation_1.validate,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: typeorm_config_1.typeOrmConfigFactory,
                imports: [config_1.ConfigModule],
            }),
            audit_module_1.AuditModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            plans_module_1.PlansModule,
            courses_module_1.CoursesModule,
            enrollments_module_1.EnrollmentsModule,
            progress_module_1.ProgressModule,
            quizzes_module_1.QuizzesModule,
            attempts_module_1.AttemptsModule,
            certificates_module_1.CertificatesModule,
            admin_module_1.AdminModule,
            chat_module_1.ChatModule,
            live_classes_module_1.LiveClassesModule,
            challenges_module_1.ChallengesModule,
            health_module_1.HealthModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_interceptor_1.AuditInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map