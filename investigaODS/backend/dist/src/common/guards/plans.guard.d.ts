import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
export declare class PlansGuard implements CanActivate {
    private readonly reflector;
    private readonly subscriptionsService;
    constructor(reflector: Reflector, subscriptionsService: SubscriptionsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
