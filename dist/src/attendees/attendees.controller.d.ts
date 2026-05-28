import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from '../common/dto';
export declare class AttendeesController {
    private attendeesService;
    constructor(attendeesService: AttendeesService);
    register(body: RegisterAttendeeDto, userId: string): import("../generated/prisma/models").Prisma__AttendeeClient<{
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
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
        event: {
            description: string;
            title: string;
            slug: string;
            date: Date;
            ownerId: string;
            categoryId: string | null;
            locationName: string | null;
            address: string | null;
            city: string | null;
            isOnline: boolean;
            content: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        userId: string;
        eventId: string;
        id: string;
        createdAt: Date;
        status: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findMy(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        event: {
            category: {
                description: string | null;
                name: string;
                id: string;
            } | null;
        } & {
            description: string;
            title: string;
            slug: string;
            date: Date;
            ownerId: string;
            categoryId: string | null;
            locationName: string | null;
            address: string | null;
            city: string | null;
            isOnline: boolean;
            content: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        userId: string;
        eventId: string;
        id: string;
        createdAt: Date;
        status: string;
    })[]>;
    findByEvent(eventId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        user: {
            email: string;
            name: string;
            id: string;
            facebookId: string | null;
            instagramId: string | null;
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
        userId: string;
        eventId: string;
        id: string;
        createdAt: Date;
        status: string;
    })[]>;
    findByUser(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        event: {
            category: {
                description: string | null;
                name: string;
                id: string;
            } | null;
        } & {
            description: string;
            title: string;
            slug: string;
            date: Date;
            ownerId: string;
            categoryId: string | null;
            locationName: string | null;
            address: string | null;
            city: string | null;
            isOnline: boolean;
            content: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        userId: string;
        eventId: string;
        id: string;
        createdAt: Date;
        status: string;
    })[]>;
    unregister(eventId: string, userId: string): Promise<{
        userId: string;
        eventId: string;
        id: string;
        createdAt: Date;
        status: string;
    }>;
}
