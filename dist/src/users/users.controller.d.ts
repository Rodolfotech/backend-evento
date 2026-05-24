import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
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
    }[]>;
    getProfile(userId: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        email: string;
        facebookId: string | null;
        instagramId: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findOne(id: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        email: string;
        facebookId: string | null;
        instagramId: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
