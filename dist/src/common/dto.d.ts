export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
}
export declare class CreateEventDto {
    title: string;
    slug: string;
    description: string;
    date: string;
    ownerId: string;
    categoryId?: string;
    locationName?: string;
    address?: string;
    city?: string;
    isOnline?: boolean;
}
export declare class UpdateEventDto {
    title?: string;
    description?: string;
    date?: string;
    locationName?: string;
    address?: string;
    city?: string;
    isOnline?: boolean;
}
export declare class CreateCategoryDto {
    name: string;
    description?: string;
}
export declare class RegisterAttendeeDto {
    userId?: string;
    eventId: string;
}
export declare class ConnectSocialDto {
    platform: string;
    accessToken: string;
}
