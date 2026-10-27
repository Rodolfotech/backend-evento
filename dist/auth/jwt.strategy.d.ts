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
        isActive: boolean;
        comuna: string | null;
        facebookId: string | null;
        instagramId: string | null;
        tokenExpiresAt: Date | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        companyInstagram: string | null;
        website: string | null;
        companyRut: string | null;
        companyGiro: string | null;
        companyPhone: string | null;
        companyAddress: string | null;
        city: string | null;
        adminFirstName: string | null;
        adminLastName: string | null;
        adminRut: string | null;
        adminPhone: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
export {};
