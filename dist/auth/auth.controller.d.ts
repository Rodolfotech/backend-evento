import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto, res: Response): Promise<{
        access_token: string;
        user: {
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
        } | null;
    }>;
    register(body: RegisterDto, res: Response): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            comuna: string | null;
            facebookId: string | null;
            instagramId: string | null;
            socialToken: string | null;
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
        };
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPasswordWithToken(token: string, password: string, res: Response): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            comuna: string | null;
            facebookId: string | null;
            instagramId: string | null;
            socialToken: string | null;
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
        };
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
    }>;
    resetPasswordDirect(body: LoginDto, res: Response): Promise<{
        access_token: string;
        user: {
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
        } | null;
    }>;
    getInstagramAuthUrl(state?: string): {
        url: string;
    };
    instagramLogin(code: string, res: Response): Promise<{
        access_token: string;
        user: {
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
        } | null;
    }>;
    getGoogleAuthUrl(state?: string): {
        url: string;
    };
    googleLogin(code: string, res: Response): Promise<{
        access_token: string;
        user: {
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
        } | null;
    }>;
    me(user: any): {
        user: any;
    };
    logout(res: Response): {
        message: string;
    };
}
