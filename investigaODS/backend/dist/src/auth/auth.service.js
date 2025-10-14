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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const membership_plan_entity_1 = require("../plans/membership-plan.entity");
let AuthService = class AuthService {
    constructor(usersService, subscriptionsService, jwtService, configService) {
        this.usersService = usersService;
        this.subscriptionsService = subscriptionsService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.refreshCookieName = 'refreshToken';
    }
    async register(dto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new common_1.UnauthorizedException('Email already registered');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.usersService.create({
            email: dto.email,
            password: dto.password,
            firstName: dto.firstName,
            lastName: dto.lastName,
        }, passwordHash);
        await this.subscriptionsService.ensureDefaultSubscription(user.id, membership_plan_entity_1.MembershipPlanCode.BASIC);
        const tokens = await this.generateTokens(user);
        return { user: this.stripPassword(user), ...tokens };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(dto) {
        const user = await this.validateUser(dto.email, dto.password);
        const tokens = await this.generateTokens(user);
        return { user: this.stripPassword(user), ...tokens };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Missing refresh token');
        }
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const tokens = await this.generateTokens(user);
        return { user: this.stripPassword(user), ...tokens };
    }
    getRefreshCookieOptions() {
        const expiresIn = this.configService.get('JWT_REFRESH_EXPIRES', '7d');
        const maxAgeMs = this.parseDurationMs(expiresIn);
        return {
            httpOnly: true,
            sameSite: 'lax',
            secure: this.configService.get('NODE_ENV') === 'production',
            maxAge: maxAgeMs,
            path: '/api/auth',
        };
    }
    stripPassword(user) {
        const { passwordHash, ...rest } = user;
        return rest;
    }
    async generateTokens(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES', '15m'),
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES', '7d'),
        });
        return { accessToken, refreshToken };
    }
    parseDurationMs(duration) {
        var _a;
        const match = duration.match(/^(\\d+)([smhdw])$/);
        if (!match) {
            return 7 * 24 * 60 * 60 * 1000;
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const multipliers = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
            w: 7 * 24 * 60 * 60 * 1000,
        };
        return value * ((_a = multipliers[unit]) !== null && _a !== void 0 ? _a : multipliers.d);
    }
    getRefreshCookieName() {
        return this.refreshCookieName;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        subscriptions_service_1.SubscriptionsService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map