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
    }>;
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
    syncFeed(userId: string, eventId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        title: string;
        description: string;
        content: string | null;
        date: Date;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
        ownerId: string;
        categoryId: string | null;
    }>;
}
