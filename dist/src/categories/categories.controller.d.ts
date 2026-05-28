import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../common/dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        events: {
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
        }[];
    } & {
        description: string | null;
        name: string;
        id: string;
    })[]>;
    create(body: CreateCategoryDto): import("../generated/prisma/models").Prisma__CategoryClient<{
        description: string | null;
        name: string;
        id: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
