import { Request } from 'express';
import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    findAllUsers(adminId: string, comuna?: string, req?: Request): Promise<{
        eventCount: number;
        registrationCount: number;
        instagramClickCount: number;
        _count: undefined;
        id: string;
        email: string;
        facebookId: string | null;
        instagramId: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        comuna: string | null;
        tokenExpiresAt: Date | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findUserById(adminId: string, id: string, req?: Request): Promise<{
        eventCount: number;
        registrationCount: number;
        instagramClickCount: number;
        _count: undefined;
        ownedEvents: {
            id: string;
            date: Date;
            title: string;
            slug: string;
            city: string | null;
        }[];
        registrations: {
            id: string;
            createdAt: Date;
            event: {
                id: string;
                date: Date;
                title: string;
                slug: string;
            };
        }[];
        id: string;
        email: string;
        facebookId: string | null;
        instagramId: string | null;
        name: string;
        avatar: string | null;
        role: import("../generated/prisma/enums").Role;
        isActive: boolean;
        comuna: string | null;
        tokenExpiresAt: Date | null;
        instagramUsername: string | null;
        instagramAvatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getComunas(adminId: string, req?: Request): Promise<(string | null)[]>;
    getStats(adminId: string, req?: Request): Promise<{
        totalUsers: number;
        totalEvents: number;
        totalAttendees: number;
        totalInstagramClicks: number;
    }>;
    trackInstagramClick(userId: string, eventId?: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        eventId: string | null;
    }>;
}
