import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client.js").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client.js").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client.js").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Event: "Event";
    readonly Category: "Category";
    readonly Attendee: "Attendee";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly avatar: "avatar";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly facebookId: "facebookId";
    readonly instagramId: "instagramId";
    readonly socialToken: "socialToken";
    readonly tokenExpiresAt: "tokenExpiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const EventScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly description: "description";
    readonly content: "content";
    readonly date: "date";
    readonly locationName: "locationName";
    readonly address: "address";
    readonly city: "city";
    readonly isOnline: "isOnline";
    readonly socialFeed: "socialFeed";
    readonly lastSync: "lastSync";
    readonly ownerId: "ownerId";
    readonly categoryId: "categoryId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const AttendeeScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly eventId: "eventId";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type AttendeeScalarFieldEnum = (typeof AttendeeScalarFieldEnum)[keyof typeof AttendeeScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client/runtime/client.js").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client.js").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client.js").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client.js").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client.js").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
