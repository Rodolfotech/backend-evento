import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../common/dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        events: {
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
            socialFeed: import("@prisma/client/runtime/client").JsonValue | null;
            lastSync: Date | null;
        }[];
    } & {
        id: string;
        name: string;
        description: string | null;
    })[]>;
    create(body: CreateCategoryDto): import("../generated/prisma/models").Prisma__CategoryClient<{
        id: string;
        name: string;
        description: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
