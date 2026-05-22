import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '../common/dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
        };
    } & {
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
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(body: CreateEventDto): import("../generated/prisma/models").Prisma__EventClient<{
        category: {
            id: string;
            name: string;
            description: string | null;
        } | null;
        owner: {
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
        };
    } & {
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, body: UpdateEventDto): import("../generated/prisma/models").Prisma__EventClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    delete(id: string): import("../generated/prisma/models").Prisma__EventClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
