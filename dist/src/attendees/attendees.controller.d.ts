import { AttendeesService } from './attendees.service';
import { RegisterAttendeeDto } from '../common/dto';
export declare class AttendeesController {
    private attendeesService;
    constructor(attendeesService: AttendeesService);
    register(body: RegisterAttendeeDto, userId: string): import("../generated/prisma/models").Prisma__AttendeeClient<{
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
            content: string | null;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string;
        status: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findMy(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
            content: string | null;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string;
        status: string;
    })[]>;
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
        userId: string;
        eventId: string;
        status: string;
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
            content: string | null;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string;
        status: string;
    })[]>;
    unregister(eventId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string;
        status: string;
    }>;
}
