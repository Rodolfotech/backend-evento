import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        facebookId: string | null;
        instagramId: string | null;
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
            password: string | null;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            facebookId: string | null;
            instagramId: string | null;
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
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        facebookId: string | null;
        instagramId: string | null;
        socialToken: string | null;
        tokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
