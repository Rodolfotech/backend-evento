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
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    })[]>;
    findBySlug(slug: string): import("../generated/prisma/models").Prisma__EventClient<({
        attendees: {
            id: string;
            createdAt: Date;
            status: string;
            userId: string;
            eventId: string;
        }[];
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
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    })[]>;
    findById(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(data: {
        title: string;
        slug: string;
        description: string;
        date: string;
        ownerId: string;
        categoryId?: string;
        locationName?: string;
        address?: string;
        city?: string;
        isOnline?: boolean;
    }): import("../generated/prisma/models").Prisma__EventClient<{
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
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
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
    }>): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    delete(id: string): import("../generated/prisma/models").Prisma__EventClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        slug: string;
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
