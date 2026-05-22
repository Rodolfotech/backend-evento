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
        facebookId: string | null;
        instagramId: string | null;
        socialToken: string | null;
        tokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("../generated/prisma/models").Prisma__UserClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
