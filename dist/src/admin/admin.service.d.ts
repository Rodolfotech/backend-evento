import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    private logAudit;
    findAllUsers(adminId: string, comuna?: string, ip?: string): Promise<{
        eventCount: number;
        registrationCount: number;
        instagramClickCount: number;
        _count: undefined;
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        comuna: string | null;
        facebookId: string | null;
        instagramId: string | null;
        tokenExpiresAt: Date | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findUserById(adminId: string, id: string, ip?: string): Promise<{
        eventCount: number;
        registrationCount: number;
        instagramClickCount: number;
        _count: undefined;
        ownedEvents: {
            id: string;
            title: string;
            slug: string;
            date: Date;
            city: string | null;
        }[];
        registrations: {
            id: string;
            createdAt: Date;
            event: {
                id: string;
                title: string;
                slug: string;
                date: Date;
            };
        }[];
        id: string;
        email: string;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        comuna: string | null;
        facebookId: string | null;
        instagramId: string | null;
        tokenExpiresAt: Date | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    trackInstagramClick(userId: string, eventId?: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string | null;
    }>;
    getComunas(adminId: string, ip?: string): Promise<(string | null)[]>;
    getStats(adminId: string, ip?: string): Promise<{
        totalUsers: number;
        totalEvents: number;
        totalAttendees: number;
        totalInstagramClicks: number;
    }>;
}
