import { PrismaService } from '../prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findBySlug(slug: string): import("../generated/prisma/models").Prisma__EventClient<({
        owner: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            facebookId: string | null;
            instagramId: string | null;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            instagramUsername: string | null;
            instagramAvatar: string | null;
        };
        category: {
            id: string;
            description: string | null;
            name: string;
        } | null;
        attendees: {
            id: string;
            createdAt: Date;
            userId: string;
            eventId: string;
            status: string;
        }[];
    } & {
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByOwner(ownerId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        owner: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            name: string;
            avatar: string | null;
            role: import("../generated/prisma/enums").Role;
            isActive: boolean;
            facebookId: string | null;
            instagramId: string | null;
            socialToken: string | null;
            tokenExpiresAt: Date | null;
            instagramUsername: string | null;
            instagramAvatar: string | null;
        };
        category: {
            id: string;
            description: string | null;
            name: string;
        } | null;
    } & {
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findById(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    private resolveCategory;
    create(data: {
        title: string;
        slug: string;
        description: string;
        date: string;
        ownerId: string;
        categoryId?: string;
        categoryName?: string;
        locationName?: string;
        address?: string;
        city?: string;
        isOnline?: boolean;
        publicationStartDate?: string;
        publicationEndDate?: string;
    }): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Partial<{
        title: string;
        description: string;
        date: string;
        locationName: string;
        address: string;
        city: string;
        isOnline: boolean;
        socialFeed: any;
        lastSync: string;
        publicationStartDate: string;
        publicationEndDate: string;
        categoryName: string;
    }>): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
