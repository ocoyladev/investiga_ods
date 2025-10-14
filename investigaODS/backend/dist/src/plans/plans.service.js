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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const membership_plan_entity_1 = require("./membership-plan.entity");
let PlansService = class PlansService {
    constructor(plansRepository) {
        this.plansRepository = plansRepository;
    }
    findAll() {
        return this.plansRepository.find();
    }
    async ensureSeeded() {
        const count = await this.plansRepository.count();
        if (count === 0) {
            const basic = this.plansRepository.create({
                code: membership_plan_entity_1.MembershipPlanCode.BASIC,
                name: 'Basic',
                features: { proContent: false },
            });
            const pro = this.plansRepository.create({
                code: membership_plan_entity_1.MembershipPlanCode.PRO,
                name: 'Pro',
                features: { proContent: true, liveClasses: true },
            });
            await this.plansRepository.save([basic, pro]);
        }
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(membership_plan_entity_1.MembershipPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlansService);
//# sourceMappingURL=plans.service.js.map