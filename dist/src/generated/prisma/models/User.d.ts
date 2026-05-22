import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    avatar: string | null;
    role: $Enums.Role | null;
    isActive: boolean | null;
    facebookId: string | null;
    instagramId: string | null;
    socialToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    avatar: string | null;
    role: $Enums.Role | null;
    isActive: boolean | null;
    facebookId: string | null;
    instagramId: string | null;
    socialToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    name: number;
    avatar: number;
    role: number;
    isActive: number;
    facebookId: number;
    instagramId: number;
    socialToken: number;
    tokenExpiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    avatar?: true;
    role?: true;
    isActive?: true;
    facebookId?: true;
    instagramId?: true;
    socialToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    avatar?: true;
    role?: true;
    isActive?: true;
    facebookId?: true;
    instagramId?: true;
    socialToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    avatar?: true;
    role?: true;
    isActive?: true;
    facebookId?: true;
    instagramId?: true;
    socialToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string | null;
    name: string;
    avatar: string | null;
    role: $Enums.Role;
    isActive: boolean;
    facebookId: string | null;
    instagramId: string | null;
    socialToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringNullableFilter<"User"> | string | null;
    name?: Prisma.StringFilter<"User"> | string;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    facebookId?: Prisma.StringNullableFilter<"User"> | string | null;
    instagramId?: Prisma.StringNullableFilter<"User"> | string | null;
    socialToken?: Prisma.StringNullableFilter<"User"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    ownedEvents?: Prisma.EventListRelationFilter;
    registrations?: Prisma.AttendeeListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    facebookId?: Prisma.SortOrderInput | Prisma.SortOrder;
    instagramId?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    ownedEvents?: Prisma.EventOrderByRelationAggregateInput;
    registrations?: Prisma.AttendeeOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    facebookId?: string;
    instagramId?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringNullableFilter<"User"> | string | null;
    name?: Prisma.StringFilter<"User"> | string;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    socialToken?: Prisma.StringNullableFilter<"User"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    ownedEvents?: Prisma.EventListRelationFilter;
    registrations?: Prisma.AttendeeListRelationFilter;
}, "id" | "email" | "facebookId" | "instagramId">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    facebookId?: Prisma.SortOrderInput | Prisma.SortOrder;
    instagramId?: Prisma.SortOrderInput | Prisma.SortOrder;
    socialToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    avatar?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    facebookId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    instagramId?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    socialToken?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedEvents?: Prisma.EventCreateNestedManyWithoutOwnerInput;
    registrations?: Prisma.AttendeeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedEvents?: Prisma.EventUncheckedCreateNestedManyWithoutOwnerInput;
    registrations?: Prisma.AttendeeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedEvents?: Prisma.EventUpdateManyWithoutOwnerNestedInput;
    registrations?: Prisma.AttendeeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedEvents?: Prisma.EventUncheckedUpdateManyWithoutOwnerNestedInput;
    registrations?: Prisma.AttendeeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    facebookId?: Prisma.SortOrder;
    instagramId?: Prisma.SortOrder;
    socialToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    facebookId?: Prisma.SortOrder;
    instagramId?: Prisma.SortOrder;
    socialToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    facebookId?: Prisma.SortOrder;
    instagramId?: Prisma.SortOrder;
    socialToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutOwnedEventsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedEventsInput, Prisma.UserUncheckedCreateWithoutOwnedEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedEventsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOwnedEventsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOwnedEventsInput, Prisma.UserUncheckedCreateWithoutOwnedEventsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOwnedEventsInput;
    upsert?: Prisma.UserUpsertWithoutOwnedEventsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOwnedEventsInput, Prisma.UserUpdateWithoutOwnedEventsInput>, Prisma.UserUncheckedUpdateWithoutOwnedEventsInput>;
};
export type UserCreateNestedOneWithoutRegistrationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRegistrationsInput, Prisma.UserUncheckedCreateWithoutRegistrationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRegistrationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRegistrationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRegistrationsInput, Prisma.UserUncheckedCreateWithoutRegistrationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRegistrationsInput;
    upsert?: Prisma.UserUpsertWithoutRegistrationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRegistrationsInput, Prisma.UserUpdateWithoutRegistrationsInput>, Prisma.UserUncheckedUpdateWithoutRegistrationsInput>;
};
export type UserCreateWithoutOwnedEventsInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    registrations?: Prisma.AttendeeCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOwnedEventsInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    registrations?: Prisma.AttendeeUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOwnedEventsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedEventsInput, Prisma.UserUncheckedCreateWithoutOwnedEventsInput>;
};
export type UserUpsertWithoutOwnedEventsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOwnedEventsInput, Prisma.UserUncheckedUpdateWithoutOwnedEventsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOwnedEventsInput, Prisma.UserUncheckedCreateWithoutOwnedEventsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOwnedEventsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOwnedEventsInput, Prisma.UserUncheckedUpdateWithoutOwnedEventsInput>;
};
export type UserUpdateWithoutOwnedEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    registrations?: Prisma.AttendeeUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOwnedEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    registrations?: Prisma.AttendeeUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRegistrationsInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedEvents?: Prisma.EventCreateNestedManyWithoutOwnerInput;
};
export type UserUncheckedCreateWithoutRegistrationsInput = {
    id?: string;
    email: string;
    password?: string | null;
    name: string;
    avatar?: string | null;
    role?: $Enums.Role;
    isActive?: boolean;
    facebookId?: string | null;
    instagramId?: string | null;
    socialToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownedEvents?: Prisma.EventUncheckedCreateNestedManyWithoutOwnerInput;
};
export type UserCreateOrConnectWithoutRegistrationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRegistrationsInput, Prisma.UserUncheckedCreateWithoutRegistrationsInput>;
};
export type UserUpsertWithoutRegistrationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRegistrationsInput, Prisma.UserUncheckedUpdateWithoutRegistrationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRegistrationsInput, Prisma.UserUncheckedCreateWithoutRegistrationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRegistrationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRegistrationsInput, Prisma.UserUncheckedUpdateWithoutRegistrationsInput>;
};
export type UserUpdateWithoutRegistrationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedEvents?: Prisma.EventUpdateManyWithoutOwnerNestedInput;
};
export type UserUncheckedUpdateWithoutRegistrationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    facebookId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    instagramId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    socialToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ownedEvents?: Prisma.EventUncheckedUpdateManyWithoutOwnerNestedInput;
};
export type UserCountOutputType = {
    ownedEvents: number;
    registrations: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ownedEvents?: boolean | UserCountOutputTypeCountOwnedEventsArgs;
    registrations?: boolean | UserCountOutputTypeCountRegistrationsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountOwnedEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
export type UserCountOutputTypeCountRegistrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendeeWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    avatar?: boolean;
    role?: boolean;
    isActive?: boolean;
    facebookId?: boolean;
    instagramId?: boolean;
    socialToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    ownedEvents?: boolean | Prisma.User$ownedEventsArgs<ExtArgs>;
    registrations?: boolean | Prisma.User$registrationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    avatar?: boolean;
    role?: boolean;
    isActive?: boolean;
    facebookId?: boolean;
    instagramId?: boolean;
    socialToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    avatar?: boolean;
    role?: boolean;
    isActive?: boolean;
    facebookId?: boolean;
    instagramId?: boolean;
    socialToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    avatar?: boolean;
    role?: boolean;
    isActive?: boolean;
    facebookId?: boolean;
    instagramId?: boolean;
    socialToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "name" | "avatar" | "role" | "isActive" | "facebookId" | "instagramId" | "socialToken" | "tokenExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ownedEvents?: boolean | Prisma.User$ownedEventsArgs<ExtArgs>;
    registrations?: boolean | Prisma.User$registrationsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        ownedEvents: Prisma.$EventPayload<ExtArgs>[];
        registrations: Prisma.$AttendeePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string | null;
        name: string;
        avatar: string | null;
        role: $Enums.Role;
        isActive: boolean;
        facebookId: string | null;
        instagramId: string | null;
        socialToken: string | null;
        tokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ownedEvents<T extends Prisma.User$ownedEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ownedEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    registrations<T extends Prisma.User$registrationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$registrationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly avatar: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly isActive: Prisma.FieldRef<"User", 'Boolean'>;
    readonly facebookId: Prisma.FieldRef<"User", 'String'>;
    readonly instagramId: Prisma.FieldRef<"User", 'String'>;
    readonly socialToken: Prisma.FieldRef<"User", 'String'>;
    readonly tokenExpiresAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$ownedEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventSelect<ExtArgs> | null;
    omit?: Prisma.EventOmit<ExtArgs> | null;
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
export type User$registrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    where?: Prisma.AttendeeWhereInput;
    orderBy?: Prisma.AttendeeOrderByWithRelationInput | Prisma.AttendeeOrderByWithRelationInput[];
    cursor?: Prisma.AttendeeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AttendeeScalarFieldEnum | Prisma.AttendeeScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
