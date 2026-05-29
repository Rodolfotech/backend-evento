import { PrismaService } from '../prisma/prisma.service';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    })[]>;
    findBySlug(slug: string): import("../generated/prisma/models").Prisma__EventClient<({
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        attendees: {
            id: string;
            createdAt: Date;
            userId: string;
            eventId: string;
            status: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByOwner(ownerId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    })[]>;
    findById(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    private resolveCategory;
    private generateSlug;
    create(data: {
        title: string;
        slug?: string;
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
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
            instagramUsername: string | null;
            instagramAvatar: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }>;
    delete(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        description: string;
        title: string;
        slug: string;
        ownerId: string;
        categoryId: string | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        content: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
