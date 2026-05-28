import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
    register(body: RegisterDto): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPasswordWithToken(token: string, password: string): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
    }>;
    resetPasswordDirect(body: LoginDto): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            instagramUsername: string | null;
            instagramAvatar: string | null;
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
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
    getGoogleAuthUrl(state?: string): {
        url: string;
    };
    googleLogin(code: string): Promise<{
        access_token: string;
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
}
