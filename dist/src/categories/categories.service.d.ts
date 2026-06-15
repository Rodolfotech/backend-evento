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
            publicationStartDate: Date | null;
            publicationEndDate: Date | null;
            locationName: string | null;
            address: string | null;
            city: string | null;
            isOnline: boolean;
            imageUrl: string | null;
            instagramMediaId: string | null;
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
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
    }>;
}
