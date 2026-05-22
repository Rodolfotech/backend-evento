import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
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
    register(body: RegisterDto): Promise<{
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
