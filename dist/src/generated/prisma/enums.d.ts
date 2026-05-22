export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly ORGANIZER: "ORGANIZER";
};
export type Role = (typeof Role)[keyof typeof Role];
