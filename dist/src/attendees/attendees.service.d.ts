import { PrismaService } from '../prisma/prisma.service';
export declare class AttendeesService {
    private prisma;
    constructor(prisma: PrismaService);
    register(userId: string, eventId: string): import("../generated/prisma/models").Prisma__AttendeeClient<{
        user: {
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
        event: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        eventId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByEvent(eventId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        user: {
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
        status: string;
        userId: string;
        eventId: string;
    })[]>;
    findByUser(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        event: {
            category: {
                id: string;
                name: string;
                description: string | null;
            } | null;
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
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        eventId: string;
    })[]>;
    unregister(userId: string, eventId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        eventId: string;
    }>;
    updateStatus(id: string, status: string): import("../generated/prisma/models").Prisma__AttendeeClient<{
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        eventId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
