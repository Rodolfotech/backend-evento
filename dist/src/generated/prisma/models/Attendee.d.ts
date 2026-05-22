import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AttendeeModel = runtime.Types.Result.DefaultSelection<Prisma.$AttendeePayload>;
export type AggregateAttendee = {
    _count: AttendeeCountAggregateOutputType | null;
    _min: AttendeeMinAggregateOutputType | null;
    _max: AttendeeMaxAggregateOutputType | null;
};
export type AttendeeMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    eventId: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type AttendeeMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    eventId: string | null;
    status: string | null;
    createdAt: Date | null;
};
export type AttendeeCountAggregateOutputType = {
    id: number;
    userId: number;
    eventId: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type AttendeeMinAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    status?: true;
    createdAt?: true;
};
export type AttendeeMaxAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    status?: true;
    createdAt?: true;
};
export type AttendeeCountAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type AttendeeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendeeWhereInput;
    orderBy?: Prisma.AttendeeOrderByWithRelationInput | Prisma.AttendeeOrderByWithRelationInput[];
    cursor?: Prisma.AttendeeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AttendeeCountAggregateInputType;
    _min?: AttendeeMinAggregateInputType;
    _max?: AttendeeMaxAggregateInputType;
};
export type GetAttendeeAggregateType<T extends AttendeeAggregateArgs> = {
    [P in keyof T & keyof AggregateAttendee]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAttendee[P]> : Prisma.GetScalarType<T[P], AggregateAttendee[P]>;
};
export type AttendeeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendeeWhereInput;
    orderBy?: Prisma.AttendeeOrderByWithAggregationInput | Prisma.AttendeeOrderByWithAggregationInput[];
    by: Prisma.AttendeeScalarFieldEnum[] | Prisma.AttendeeScalarFieldEnum;
    having?: Prisma.AttendeeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AttendeeCountAggregateInputType | true;
    _min?: AttendeeMinAggregateInputType;
    _max?: AttendeeMaxAggregateInputType;
};
export type AttendeeGroupByOutputType = {
    id: string;
    userId: string;
    eventId: string;
    status: string;
    createdAt: Date;
    _count: AttendeeCountAggregateOutputType | null;
    _min: AttendeeMinAggregateOutputType | null;
    _max: AttendeeMaxAggregateOutputType | null;
};
export type GetAttendeeGroupByPayload<T extends AttendeeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AttendeeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AttendeeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AttendeeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AttendeeGroupByOutputType[P]>;
}>>;
export type AttendeeWhereInput = {
    AND?: Prisma.AttendeeWhereInput | Prisma.AttendeeWhereInput[];
    OR?: Prisma.AttendeeWhereInput[];
    NOT?: Prisma.AttendeeWhereInput | Prisma.AttendeeWhereInput[];
    id?: Prisma.StringFilter<"Attendee"> | string;
    userId?: Prisma.StringFilter<"Attendee"> | string;
    eventId?: Prisma.StringFilter<"Attendee"> | string;
    status?: Prisma.StringFilter<"Attendee"> | string;
    createdAt?: Prisma.DateTimeFilter<"Attendee"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    event?: Prisma.XOR<Prisma.EventScalarRelationFilter, Prisma.EventWhereInput>;
};
export type AttendeeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    event?: Prisma.EventOrderByWithRelationInput;
};
export type AttendeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_eventId?: Prisma.AttendeeUserIdEventIdCompoundUniqueInput;
    AND?: Prisma.AttendeeWhereInput | Prisma.AttendeeWhereInput[];
    OR?: Prisma.AttendeeWhereInput[];
    NOT?: Prisma.AttendeeWhereInput | Prisma.AttendeeWhereInput[];
    userId?: Prisma.StringFilter<"Attendee"> | string;
    eventId?: Prisma.StringFilter<"Attendee"> | string;
    status?: Prisma.StringFilter<"Attendee"> | string;
    createdAt?: Prisma.DateTimeFilter<"Attendee"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    event?: Prisma.XOR<Prisma.EventScalarRelationFilter, Prisma.EventWhereInput>;
}, "id" | "userId_eventId">;
export type AttendeeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AttendeeCountOrderByAggregateInput;
    _max?: Prisma.AttendeeMaxOrderByAggregateInput;
    _min?: Prisma.AttendeeMinOrderByAggregateInput;
};
export type AttendeeScalarWhereWithAggregatesInput = {
    AND?: Prisma.AttendeeScalarWhereWithAggregatesInput | Prisma.AttendeeScalarWhereWithAggregatesInput[];
    OR?: Prisma.AttendeeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AttendeeScalarWhereWithAggregatesInput | Prisma.AttendeeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Attendee"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Attendee"> | string;
    eventId?: Prisma.StringWithAggregatesFilter<"Attendee"> | string;
    status?: Prisma.StringWithAggregatesFilter<"Attendee"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Attendee"> | Date | string;
};
export type AttendeeCreateInput = {
    id?: string;
    status?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRegistrationsInput;
    event: Prisma.EventCreateNestedOneWithoutAttendeesInput;
};
export type AttendeeUncheckedCreateInput = {
    id?: string;
    userId: string;
    eventId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRegistrationsNestedInput;
    event?: Prisma.EventUpdateOneRequiredWithoutAttendeesNestedInput;
};
export type AttendeeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeCreateManyInput = {
    id?: string;
    userId: string;
    eventId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeListRelationFilter = {
    every?: Prisma.AttendeeWhereInput;
    some?: Prisma.AttendeeWhereInput;
    none?: Prisma.AttendeeWhereInput;
};
export type AttendeeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AttendeeUserIdEventIdCompoundUniqueInput = {
    userId: string;
    eventId: string;
};
export type AttendeeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendeeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendeeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AttendeeCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput> | Prisma.AttendeeCreateWithoutUserInput[] | Prisma.AttendeeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutUserInput | Prisma.AttendeeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttendeeCreateManyUserInputEnvelope;
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
};
export type AttendeeUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput> | Prisma.AttendeeCreateWithoutUserInput[] | Prisma.AttendeeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutUserInput | Prisma.AttendeeCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AttendeeCreateManyUserInputEnvelope;
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
};
export type AttendeeUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput> | Prisma.AttendeeCreateWithoutUserInput[] | Prisma.AttendeeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutUserInput | Prisma.AttendeeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttendeeUpsertWithWhereUniqueWithoutUserInput | Prisma.AttendeeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttendeeCreateManyUserInputEnvelope;
    set?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    disconnect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    delete?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    update?: Prisma.AttendeeUpdateWithWhereUniqueWithoutUserInput | Prisma.AttendeeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttendeeUpdateManyWithWhereWithoutUserInput | Prisma.AttendeeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
};
export type AttendeeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput> | Prisma.AttendeeCreateWithoutUserInput[] | Prisma.AttendeeUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutUserInput | Prisma.AttendeeCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AttendeeUpsertWithWhereUniqueWithoutUserInput | Prisma.AttendeeUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AttendeeCreateManyUserInputEnvelope;
    set?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    disconnect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    delete?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    update?: Prisma.AttendeeUpdateWithWhereUniqueWithoutUserInput | Prisma.AttendeeUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AttendeeUpdateManyWithWhereWithoutUserInput | Prisma.AttendeeUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
};
export type AttendeeCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput> | Prisma.AttendeeCreateWithoutEventInput[] | Prisma.AttendeeUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutEventInput | Prisma.AttendeeCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.AttendeeCreateManyEventInputEnvelope;
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
};
export type AttendeeUncheckedCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput> | Prisma.AttendeeCreateWithoutEventInput[] | Prisma.AttendeeUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutEventInput | Prisma.AttendeeCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.AttendeeCreateManyEventInputEnvelope;
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
};
export type AttendeeUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput> | Prisma.AttendeeCreateWithoutEventInput[] | Prisma.AttendeeUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutEventInput | Prisma.AttendeeCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.AttendeeUpsertWithWhereUniqueWithoutEventInput | Prisma.AttendeeUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.AttendeeCreateManyEventInputEnvelope;
    set?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    disconnect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    delete?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    update?: Prisma.AttendeeUpdateWithWhereUniqueWithoutEventInput | Prisma.AttendeeUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.AttendeeUpdateManyWithWhereWithoutEventInput | Prisma.AttendeeUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
};
export type AttendeeUncheckedUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput> | Prisma.AttendeeCreateWithoutEventInput[] | Prisma.AttendeeUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.AttendeeCreateOrConnectWithoutEventInput | Prisma.AttendeeCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.AttendeeUpsertWithWhereUniqueWithoutEventInput | Prisma.AttendeeUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.AttendeeCreateManyEventInputEnvelope;
    set?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    disconnect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    delete?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    connect?: Prisma.AttendeeWhereUniqueInput | Prisma.AttendeeWhereUniqueInput[];
    update?: Prisma.AttendeeUpdateWithWhereUniqueWithoutEventInput | Prisma.AttendeeUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.AttendeeUpdateManyWithWhereWithoutEventInput | Prisma.AttendeeUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
};
export type AttendeeCreateWithoutUserInput = {
    id?: string;
    status?: string;
    createdAt?: Date | string;
    event: Prisma.EventCreateNestedOneWithoutAttendeesInput;
};
export type AttendeeUncheckedCreateWithoutUserInput = {
    id?: string;
    eventId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeCreateOrConnectWithoutUserInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput>;
};
export type AttendeeCreateManyUserInputEnvelope = {
    data: Prisma.AttendeeCreateManyUserInput | Prisma.AttendeeCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AttendeeUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttendeeUpdateWithoutUserInput, Prisma.AttendeeUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AttendeeCreateWithoutUserInput, Prisma.AttendeeUncheckedCreateWithoutUserInput>;
};
export type AttendeeUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttendeeUpdateWithoutUserInput, Prisma.AttendeeUncheckedUpdateWithoutUserInput>;
};
export type AttendeeUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AttendeeScalarWhereInput;
    data: Prisma.XOR<Prisma.AttendeeUpdateManyMutationInput, Prisma.AttendeeUncheckedUpdateManyWithoutUserInput>;
};
export type AttendeeScalarWhereInput = {
    AND?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
    OR?: Prisma.AttendeeScalarWhereInput[];
    NOT?: Prisma.AttendeeScalarWhereInput | Prisma.AttendeeScalarWhereInput[];
    id?: Prisma.StringFilter<"Attendee"> | string;
    userId?: Prisma.StringFilter<"Attendee"> | string;
    eventId?: Prisma.StringFilter<"Attendee"> | string;
    status?: Prisma.StringFilter<"Attendee"> | string;
    createdAt?: Prisma.DateTimeFilter<"Attendee"> | Date | string;
};
export type AttendeeCreateWithoutEventInput = {
    id?: string;
    status?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRegistrationsInput;
};
export type AttendeeUncheckedCreateWithoutEventInput = {
    id?: string;
    userId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeCreateOrConnectWithoutEventInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput>;
};
export type AttendeeCreateManyEventInputEnvelope = {
    data: Prisma.AttendeeCreateManyEventInput | Prisma.AttendeeCreateManyEventInput[];
    skipDuplicates?: boolean;
};
export type AttendeeUpsertWithWhereUniqueWithoutEventInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    update: Prisma.XOR<Prisma.AttendeeUpdateWithoutEventInput, Prisma.AttendeeUncheckedUpdateWithoutEventInput>;
    create: Prisma.XOR<Prisma.AttendeeCreateWithoutEventInput, Prisma.AttendeeUncheckedCreateWithoutEventInput>;
};
export type AttendeeUpdateWithWhereUniqueWithoutEventInput = {
    where: Prisma.AttendeeWhereUniqueInput;
    data: Prisma.XOR<Prisma.AttendeeUpdateWithoutEventInput, Prisma.AttendeeUncheckedUpdateWithoutEventInput>;
};
export type AttendeeUpdateManyWithWhereWithoutEventInput = {
    where: Prisma.AttendeeScalarWhereInput;
    data: Prisma.XOR<Prisma.AttendeeUpdateManyMutationInput, Prisma.AttendeeUncheckedUpdateManyWithoutEventInput>;
};
export type AttendeeCreateManyUserInput = {
    id?: string;
    eventId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    event?: Prisma.EventUpdateOneRequiredWithoutAttendeesNestedInput;
};
export type AttendeeUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeCreateManyEventInput = {
    id?: string;
    userId: string;
    status?: string;
    createdAt?: Date | string;
};
export type AttendeeUpdateWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRegistrationsNestedInput;
};
export type AttendeeUncheckedUpdateWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeUncheckedUpdateManyWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AttendeeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendee"]>;
export type AttendeeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendee"]>;
export type AttendeeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["attendee"]>;
export type AttendeeSelectScalar = {
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type AttendeeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "eventId" | "status" | "createdAt", ExtArgs["result"]["attendee"]>;
export type AttendeeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type AttendeeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type AttendeeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type $AttendeePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Attendee";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        event: Prisma.$EventPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        eventId: string;
        status: string;
        createdAt: Date;
    }, ExtArgs["result"]["attendee"]>;
    composites: {};
};
export type AttendeeGetPayload<S extends boolean | null | undefined | AttendeeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AttendeePayload, S>;
export type AttendeeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AttendeeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AttendeeCountAggregateInputType | true;
};
export interface AttendeeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Attendee'];
        meta: {
            name: 'Attendee';
        };
    };
    findUnique<T extends AttendeeFindUniqueArgs>(args: Prisma.SelectSubset<T, AttendeeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AttendeeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AttendeeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AttendeeFindFirstArgs>(args?: Prisma.SelectSubset<T, AttendeeFindFirstArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AttendeeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AttendeeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AttendeeFindManyArgs>(args?: Prisma.SelectSubset<T, AttendeeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AttendeeCreateArgs>(args: Prisma.SelectSubset<T, AttendeeCreateArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AttendeeCreateManyArgs>(args?: Prisma.SelectSubset<T, AttendeeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AttendeeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AttendeeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AttendeeDeleteArgs>(args: Prisma.SelectSubset<T, AttendeeDeleteArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AttendeeUpdateArgs>(args: Prisma.SelectSubset<T, AttendeeUpdateArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AttendeeDeleteManyArgs>(args?: Prisma.SelectSubset<T, AttendeeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AttendeeUpdateManyArgs>(args: Prisma.SelectSubset<T, AttendeeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AttendeeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AttendeeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AttendeeUpsertArgs>(args: Prisma.SelectSubset<T, AttendeeUpsertArgs<ExtArgs>>): Prisma.Prisma__AttendeeClient<runtime.Types.Result.GetResult<Prisma.$AttendeePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AttendeeCountArgs>(args?: Prisma.Subset<T, AttendeeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AttendeeCountAggregateOutputType> : number>;
    aggregate<T extends AttendeeAggregateArgs>(args: Prisma.Subset<T, AttendeeAggregateArgs>): Prisma.PrismaPromise<GetAttendeeAggregateType<T>>;
    groupBy<T extends AttendeeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AttendeeGroupByArgs['orderBy'];
    } : {
        orderBy?: AttendeeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AttendeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AttendeeFieldRefs;
}
export interface Prisma__AttendeeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    event<T extends Prisma.EventDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EventDefaultArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AttendeeFieldRefs {
    readonly id: Prisma.FieldRef<"Attendee", 'String'>;
    readonly userId: Prisma.FieldRef<"Attendee", 'String'>;
    readonly eventId: Prisma.FieldRef<"Attendee", 'String'>;
    readonly status: Prisma.FieldRef<"Attendee", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Attendee", 'DateTime'>;
}
export type AttendeeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    where: Prisma.AttendeeWhereUniqueInput;
};
export type AttendeeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    where: Prisma.AttendeeWhereUniqueInput;
};
export type AttendeeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AttendeeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AttendeeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AttendeeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendeeCreateInput, Prisma.AttendeeUncheckedCreateInput>;
};
export type AttendeeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AttendeeCreateManyInput | Prisma.AttendeeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AttendeeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    data: Prisma.AttendeeCreateManyInput | Prisma.AttendeeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AttendeeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AttendeeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendeeUpdateInput, Prisma.AttendeeUncheckedUpdateInput>;
    where: Prisma.AttendeeWhereUniqueInput;
};
export type AttendeeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AttendeeUpdateManyMutationInput, Prisma.AttendeeUncheckedUpdateManyInput>;
    where?: Prisma.AttendeeWhereInput;
    limit?: number;
};
export type AttendeeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AttendeeUpdateManyMutationInput, Prisma.AttendeeUncheckedUpdateManyInput>;
    where?: Prisma.AttendeeWhereInput;
    limit?: number;
    include?: Prisma.AttendeeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AttendeeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    where: Prisma.AttendeeWhereUniqueInput;
    create: Prisma.XOR<Prisma.AttendeeCreateInput, Prisma.AttendeeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AttendeeUpdateInput, Prisma.AttendeeUncheckedUpdateInput>;
};
export type AttendeeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
    where: Prisma.AttendeeWhereUniqueInput;
};
export type AttendeeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AttendeeWhereInput;
    limit?: number;
};
export type AttendeeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AttendeeSelect<ExtArgs> | null;
    omit?: Prisma.AttendeeOmit<ExtArgs> | null;
    include?: Prisma.AttendeeInclude<ExtArgs> | null;
};
