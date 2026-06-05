import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfile(userId: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        facebookId: string | null;
        instagramId: string | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateProfile(userId: string, body: {
        name?: string;
        avatar?: string;
    }): import("../generated/prisma/models").Prisma__UserClient<{
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
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findOne(id: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        facebookId: string | null;
        instagramId: string | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
