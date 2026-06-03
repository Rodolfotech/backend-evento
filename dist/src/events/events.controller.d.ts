import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '../common/dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    findAll(city?: string, page?: string, limit?: string): Promise<{
        data: ({
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
                comuna: string | null;
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
            imageUrl: string | null;
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findByOwner(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
            comuna: string | null;
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
        imageUrl: string | null;
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
            comuna: string | null;
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
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(body: CreateEventDto, userId: string): Promise<{
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
            comuna: string | null;
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
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }>;
    update(id: string, body: UpdateEventDto): Promise<{
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
        imageUrl: string | null;
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
        imageUrl: string | null;
        socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
        lastSync: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
