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
