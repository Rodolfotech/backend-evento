import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        events: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
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
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
    })[]>;
    create(data: {
        name: string;
        description?: string;
    }): import("../generated/prisma/models").Prisma__CategoryClient<{
        id: string;
        name: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
