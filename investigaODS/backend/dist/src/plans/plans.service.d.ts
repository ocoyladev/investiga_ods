import { Repository } from 'typeorm';
import { MembershipPlan } from './membership-plan.entity';
export declare class PlansService {
    private readonly plansRepository;
    constructor(plansRepository: Repository<MembershipPlan>);
    findAll(): Promise<MembershipPlan[]>;
    ensureSeeded(): Promise<void>;
}
