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
exports.ChallengeSubmission = exports.ChallengeSubmissionStatus = void 0;
const typeorm_1 = require("typeorm");
const challenge_entity_1 = require("./challenge.entity");
const user_entity_1 = require("../users/user.entity");
var ChallengeSubmissionStatus;
(function (ChallengeSubmissionStatus) {
    ChallengeSubmissionStatus["SUBMITTED"] = "SUBMITTED";
    ChallengeSubmissionStatus["REVIEWING"] = "REVIEWING";
    ChallengeSubmissionStatus["APPROVED"] = "APPROVED";
    ChallengeSubmissionStatus["REJECTED"] = "REJECTED";
})(ChallengeSubmissionStatus || (exports.ChallengeSubmissionStatus = ChallengeSubmissionStatus = {}));
let ChallengeSubmission = class ChallengeSubmission {
};
exports.ChallengeSubmission = ChallengeSubmission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChallengeSubmission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => challenge_entity_1.Challenge, (challenge) => challenge.submissions, { eager: true }),
    __metadata("design:type", challenge_entity_1.Challenge)
], ChallengeSubmission.prototype, "challenge", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], ChallengeSubmission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'artifact_url', nullable: true }),
    __metadata("design:type", String)
], ChallengeSubmission.prototype, "artifactUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ChallengeSubmission.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ChallengeSubmissionStatus, default: ChallengeSubmissionStatus.SUBMITTED }),
    __metadata("design:type", String)
], ChallengeSubmission.prototype, "status", void 0);
exports.ChallengeSubmission = ChallengeSubmission = __decorate([
    (0, typeorm_1.Entity)({ name: 'challenge_submissions' })
], ChallengeSubmission);
//# sourceMappingURL=challenge-submission.entity.js.map