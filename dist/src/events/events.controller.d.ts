import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '../common/dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(city?: string, page?: string, limit?: string): Promise<{
        data: ({
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
            publicationStartDate: Date | null;
            publicationEndDate: Date | null;
            locationName: string | null;
            address: string | null;
            city: string | null;
            isOnline: boolean;
            imageUrl: string | null;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
            ownerId: string;
            categoryId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByOwner(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
        ownerId: string;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
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
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
        ownerId: string;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(body: CreateEventDto, userId: string): Promise<{
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
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
        ownerId: string;
        categoryId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, body: UpdateEventDto): Promise<{
        id: string;
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
        publicationStartDate: Date | null;
        publicationEndDate: Date | null;
        locationName: string | null;
        address: string | null;
        city: string | null;
        isOnline: boolean;
        imageUrl: string | null;
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
