import { SocialService } from './social.service';
import { ConnectSocialDto } from '../common/dto';
export declare class SocialController {
    private socialService;
    constructor(socialService: SocialService);
    getInstagramAuthUrl(): {
        url: string;
    };
    instagramCallback(userId: string, code: string): Promise<{
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
    } | null>;
    connectInstagram(userId: string, body: ConnectSocialDto): Promise<{
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
    }>;
    connectFacebook(userId: string, body: ConnectSocialDto): Promise<{
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
    }>;
    disconnect(userId: string, platform: string): Promise<{
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
    }>;
    getStatus(userId: string): Promise<{
        facebook: boolean;
        instagram: boolean;
    }>;
    refreshToken(userId: string): Promise<{
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
    }>;
    getUserMedia(userId: string): Promise<any>;
    syncFeed(userId: string, eventId: string): Promise<void>;
    verifyWebhook(mode: string, challenge: string, verifyToken: string): Promise<string>;
    handleWebhook(req: any): Promise<void>;
}
