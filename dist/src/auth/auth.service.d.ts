import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    private mailService;
    private config;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService, mailService: MailService, config: ConfigService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        facebookId: string | null;
        instagramId: string | null;
        password: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        socialToken: string | null;
        tokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            facebookId: string | null;
            instagramId: string | null;
            password: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    register(data: {
        email: string;
        password: string;
        name: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            facebookId: string | null;
            instagramId: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPasswordWithToken(token: string, newPassword: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            facebookId: string | null;
            instagramId: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
    }>;
    resetPassword(email: string, newPassword: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            facebookId: string | null;
            instagramId: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
    getInstagramAuthUrl(state?: string): {
        url: string;
    };
    instagramLogin(code: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            facebookId: string | null;
            instagramId: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
}
