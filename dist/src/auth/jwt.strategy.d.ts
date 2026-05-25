import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    private readonly logger;
    constructor(usersService: UsersService, config: ConfigService);
    validate(payload: {
        sub: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        facebookId: string | null;
        instagramId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
