import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InstagramClickModel = runtime.Types.Result.DefaultSelection<Prisma.$InstagramClickPayload>;
export type AggregateInstagramClick = {
    _count: InstagramClickCountAggregateOutputType | null;
    _min: InstagramClickMinAggregateOutputType | null;
    _max: InstagramClickMaxAggregateOutputType | null;
};
export type InstagramClickMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    eventId: string | null;
    createdAt: Date | null;
};
export type InstagramClickMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    eventId: string | null;
    createdAt: Date | null;
};
export type InstagramClickCountAggregateOutputType = {
    id: number;
    userId: number;
    eventId: number;
    createdAt: number;
    _all: number;
};
export type InstagramClickMinAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    createdAt?: true;
};
export type InstagramClickMaxAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    createdAt?: true;
};
export type InstagramClickCountAggregateInputType = {
    id?: true;
    userId?: true;
    eventId?: true;
    createdAt?: true;
    _all?: true;
};
export type InstagramClickAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramClickWhereInput;
    orderBy?: Prisma.InstagramClickOrderByWithRelationInput | Prisma.InstagramClickOrderByWithRelationInput[];
    cursor?: Prisma.InstagramClickWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InstagramClickCountAggregateInputType;
    _min?: InstagramClickMinAggregateInputType;
    _max?: InstagramClickMaxAggregateInputType;
};
export type GetInstagramClickAggregateType<T extends InstagramClickAggregateArgs> = {
    [P in keyof T & keyof AggregateInstagramClick]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInstagramClick[P]> : Prisma.GetScalarType<T[P], AggregateInstagramClick[P]>;
};
export type InstagramClickGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramClickWhereInput;
    orderBy?: Prisma.InstagramClickOrderByWithAggregationInput | Prisma.InstagramClickOrderByWithAggregationInput[];
    by: Prisma.InstagramClickScalarFieldEnum[] | Prisma.InstagramClickScalarFieldEnum;
    having?: Prisma.InstagramClickScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InstagramClickCountAggregateInputType | true;
    _min?: InstagramClickMinAggregateInputType;
    _max?: InstagramClickMaxAggregateInputType;
};
export type InstagramClickGroupByOutputType = {
    id: string;
    userId: string;
    eventId: string | null;
    createdAt: Date;
    _count: InstagramClickCountAggregateOutputType | null;
    _min: InstagramClickMinAggregateOutputType | null;
    _max: InstagramClickMaxAggregateOutputType | null;
};
export type GetInstagramClickGroupByPayload<T extends InstagramClickGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InstagramClickGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InstagramClickGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InstagramClickGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InstagramClickGroupByOutputType[P]>;
}>>;
export type InstagramClickWhereInput = {
    AND?: Prisma.InstagramClickWhereInput | Prisma.InstagramClickWhereInput[];
    OR?: Prisma.InstagramClickWhereInput[];
    NOT?: Prisma.InstagramClickWhereInput | Prisma.InstagramClickWhereInput[];
    id?: Prisma.StringFilter<"InstagramClick"> | string;
    userId?: Prisma.StringFilter<"InstagramClick"> | string;
    eventId?: Prisma.StringNullableFilter<"InstagramClick"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstagramClick"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type InstagramClickOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type InstagramClickWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InstagramClickWhereInput | Prisma.InstagramClickWhereInput[];
    OR?: Prisma.InstagramClickWhereInput[];
    NOT?: Prisma.InstagramClickWhereInput | Prisma.InstagramClickWhereInput[];
    userId?: Prisma.StringFilter<"InstagramClick"> | string;
    eventId?: Prisma.StringNullableFilter<"InstagramClick"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstagramClick"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type InstagramClickOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InstagramClickCountOrderByAggregateInput;
    _max?: Prisma.InstagramClickMaxOrderByAggregateInput;
    _min?: Prisma.InstagramClickMinOrderByAggregateInput;
};
export type InstagramClickScalarWhereWithAggregatesInput = {
    AND?: Prisma.InstagramClickScalarWhereWithAggregatesInput | Prisma.InstagramClickScalarWhereWithAggregatesInput[];
    OR?: Prisma.InstagramClickScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InstagramClickScalarWhereWithAggregatesInput | Prisma.InstagramClickScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InstagramClick"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"InstagramClick"> | string;
    eventId?: Prisma.StringNullableWithAggregatesFilter<"InstagramClick"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InstagramClick"> | Date | string;
};
export type InstagramClickCreateInput = {
    id?: string;
    eventId?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInstagramClicksInput;
};
export type InstagramClickUncheckedCreateInput = {
    id?: string;
    userId: string;
    eventId?: string | null;
    createdAt?: Date | string;
};
export type InstagramClickUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInstagramClicksNestedInput;
};
export type InstagramClickUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickCreateManyInput = {
    id?: string;
    userId: string;
    eventId?: string | null;
    createdAt?: Date | string;
};
export type InstagramClickUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickListRelationFilter = {
    every?: Prisma.InstagramClickWhereInput;
    some?: Prisma.InstagramClickWhereInput;
    none?: Prisma.InstagramClickWhereInput;
};
export type InstagramClickOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InstagramClickCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstagramClickMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstagramClickMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InstagramClickCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput> | Prisma.InstagramClickCreateWithoutUserInput[] | Prisma.InstagramClickUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstagramClickCreateOrConnectWithoutUserInput | Prisma.InstagramClickCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstagramClickCreateManyUserInputEnvelope;
    connect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
};
export type InstagramClickUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput> | Prisma.InstagramClickCreateWithoutUserInput[] | Prisma.InstagramClickUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstagramClickCreateOrConnectWithoutUserInput | Prisma.InstagramClickCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.InstagramClickCreateManyUserInputEnvelope;
    connect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
};
export type InstagramClickUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput> | Prisma.InstagramClickCreateWithoutUserInput[] | Prisma.InstagramClickUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstagramClickCreateOrConnectWithoutUserInput | Prisma.InstagramClickCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstagramClickUpsertWithWhereUniqueWithoutUserInput | Prisma.InstagramClickUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstagramClickCreateManyUserInputEnvelope;
    set?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    disconnect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    delete?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    connect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    update?: Prisma.InstagramClickUpdateWithWhereUniqueWithoutUserInput | Prisma.InstagramClickUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstagramClickUpdateManyWithWhereWithoutUserInput | Prisma.InstagramClickUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstagramClickScalarWhereInput | Prisma.InstagramClickScalarWhereInput[];
};
export type InstagramClickUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput> | Prisma.InstagramClickCreateWithoutUserInput[] | Prisma.InstagramClickUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.InstagramClickCreateOrConnectWithoutUserInput | Prisma.InstagramClickCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.InstagramClickUpsertWithWhereUniqueWithoutUserInput | Prisma.InstagramClickUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.InstagramClickCreateManyUserInputEnvelope;
    set?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    disconnect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    delete?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    connect?: Prisma.InstagramClickWhereUniqueInput | Prisma.InstagramClickWhereUniqueInput[];
    update?: Prisma.InstagramClickUpdateWithWhereUniqueWithoutUserInput | Prisma.InstagramClickUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.InstagramClickUpdateManyWithWhereWithoutUserInput | Prisma.InstagramClickUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.InstagramClickScalarWhereInput | Prisma.InstagramClickScalarWhereInput[];
};
export type InstagramClickCreateWithoutUserInput = {
    id?: string;
    eventId?: string | null;
    createdAt?: Date | string;
};
export type InstagramClickUncheckedCreateWithoutUserInput = {
    id?: string;
    eventId?: string | null;
    createdAt?: Date | string;
};
export type InstagramClickCreateOrConnectWithoutUserInput = {
    where: Prisma.InstagramClickWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput>;
};
export type InstagramClickCreateManyUserInputEnvelope = {
    data: Prisma.InstagramClickCreateManyUserInput | Prisma.InstagramClickCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type InstagramClickUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstagramClickWhereUniqueInput;
    update: Prisma.XOR<Prisma.InstagramClickUpdateWithoutUserInput, Prisma.InstagramClickUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.InstagramClickCreateWithoutUserInput, Prisma.InstagramClickUncheckedCreateWithoutUserInput>;
};
export type InstagramClickUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.InstagramClickWhereUniqueInput;
    data: Prisma.XOR<Prisma.InstagramClickUpdateWithoutUserInput, Prisma.InstagramClickUncheckedUpdateWithoutUserInput>;
};
export type InstagramClickUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.InstagramClickScalarWhereInput;
    data: Prisma.XOR<Prisma.InstagramClickUpdateManyMutationInput, Prisma.InstagramClickUncheckedUpdateManyWithoutUserInput>;
};
export type InstagramClickScalarWhereInput = {
    AND?: Prisma.InstagramClickScalarWhereInput | Prisma.InstagramClickScalarWhereInput[];
    OR?: Prisma.InstagramClickScalarWhereInput[];
    NOT?: Prisma.InstagramClickScalarWhereInput | Prisma.InstagramClickScalarWhereInput[];
    id?: Prisma.StringFilter<"InstagramClick"> | string;
    userId?: Prisma.StringFilter<"InstagramClick"> | string;
    eventId?: Prisma.StringNullableFilter<"InstagramClick"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"InstagramClick"> | Date | string;
};
export type InstagramClickCreateManyUserInput = {
    id?: string;
    eventId?: string | null;
    createdAt?: Date | string;
};
export type InstagramClickUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InstagramClickSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramClick"]>;
export type InstagramClickSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramClick"]>;
export type InstagramClickSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["instagramClick"]>;
export type InstagramClickSelectScalar = {
    id?: boolean;
    userId?: boolean;
    eventId?: boolean;
    createdAt?: boolean;
};
export type InstagramClickOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "eventId" | "createdAt", ExtArgs["result"]["instagramClick"]>;
export type InstagramClickInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InstagramClickIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InstagramClickIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InstagramClickPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InstagramClick";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        eventId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["instagramClick"]>;
    composites: {};
};
export type InstagramClickGetPayload<S extends boolean | null | undefined | InstagramClickDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload, S>;
export type InstagramClickCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InstagramClickFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InstagramClickCountAggregateInputType | true;
};
export interface InstagramClickDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InstagramClick'];
        meta: {
            name: 'InstagramClick';
        };
    };
    findUnique<T extends InstagramClickFindUniqueArgs>(args: Prisma.SelectSubset<T, InstagramClickFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InstagramClickFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InstagramClickFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InstagramClickFindFirstArgs>(args?: Prisma.SelectSubset<T, InstagramClickFindFirstArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InstagramClickFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InstagramClickFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InstagramClickFindManyArgs>(args?: Prisma.SelectSubset<T, InstagramClickFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InstagramClickCreateArgs>(args: Prisma.SelectSubset<T, InstagramClickCreateArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InstagramClickCreateManyArgs>(args?: Prisma.SelectSubset<T, InstagramClickCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InstagramClickCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InstagramClickCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InstagramClickDeleteArgs>(args: Prisma.SelectSubset<T, InstagramClickDeleteArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InstagramClickUpdateArgs>(args: Prisma.SelectSubset<T, InstagramClickUpdateArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InstagramClickDeleteManyArgs>(args?: Prisma.SelectSubset<T, InstagramClickDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InstagramClickUpdateManyArgs>(args: Prisma.SelectSubset<T, InstagramClickUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InstagramClickUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InstagramClickUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InstagramClickUpsertArgs>(args: Prisma.SelectSubset<T, InstagramClickUpsertArgs<ExtArgs>>): Prisma.Prisma__InstagramClickClient<runtime.Types.Result.GetResult<Prisma.$InstagramClickPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InstagramClickCountArgs>(args?: Prisma.Subset<T, InstagramClickCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InstagramClickCountAggregateOutputType> : number>;
    aggregate<T extends InstagramClickAggregateArgs>(args: Prisma.Subset<T, InstagramClickAggregateArgs>): Prisma.PrismaPromise<GetInstagramClickAggregateType<T>>;
    groupBy<T extends InstagramClickGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InstagramClickGroupByArgs['orderBy'];
    } : {
        orderBy?: InstagramClickGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InstagramClickGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstagramClickGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InstagramClickFieldRefs;
}
export interface Prisma__InstagramClickClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InstagramClickFieldRefs {
    readonly id: Prisma.FieldRef<"InstagramClick", 'String'>;
    readonly userId: Prisma.FieldRef<"InstagramClick", 'String'>;
    readonly eventId: Prisma.FieldRef<"InstagramClick", 'String'>;
    readonly createdAt: Prisma.FieldRef<"InstagramClick", 'DateTime'>;
}
export type InstagramClickFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where: Prisma.InstagramClickWhereUniqueInput;
};
export type InstagramClickFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where: Prisma.InstagramClickWhereUniqueInput;
};
export type InstagramClickFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where?: Prisma.InstagramClickWhereInput;
    orderBy?: Prisma.InstagramClickOrderByWithRelationInput | Prisma.InstagramClickOrderByWithRelationInput[];
    cursor?: Prisma.InstagramClickWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramClickScalarFieldEnum | Prisma.InstagramClickScalarFieldEnum[];
};
export type InstagramClickFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where?: Prisma.InstagramClickWhereInput;
    orderBy?: Prisma.InstagramClickOrderByWithRelationInput | Prisma.InstagramClickOrderByWithRelationInput[];
    cursor?: Prisma.InstagramClickWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramClickScalarFieldEnum | Prisma.InstagramClickScalarFieldEnum[];
};
export type InstagramClickFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where?: Prisma.InstagramClickWhereInput;
    orderBy?: Prisma.InstagramClickOrderByWithRelationInput | Prisma.InstagramClickOrderByWithRelationInput[];
    cursor?: Prisma.InstagramClickWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InstagramClickScalarFieldEnum | Prisma.InstagramClickScalarFieldEnum[];
};
export type InstagramClickCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramClickCreateInput, Prisma.InstagramClickUncheckedCreateInput>;
};
export type InstagramClickCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InstagramClickCreateManyInput | Prisma.InstagramClickCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InstagramClickCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    data: Prisma.InstagramClickCreateManyInput | Prisma.InstagramClickCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InstagramClickIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InstagramClickUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramClickUpdateInput, Prisma.InstagramClickUncheckedUpdateInput>;
    where: Prisma.InstagramClickWhereUniqueInput;
};
export type InstagramClickUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InstagramClickUpdateManyMutationInput, Prisma.InstagramClickUncheckedUpdateManyInput>;
    where?: Prisma.InstagramClickWhereInput;
    limit?: number;
};
export type InstagramClickUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InstagramClickUpdateManyMutationInput, Prisma.InstagramClickUncheckedUpdateManyInput>;
    where?: Prisma.InstagramClickWhereInput;
    limit?: number;
    include?: Prisma.InstagramClickIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InstagramClickUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where: Prisma.InstagramClickWhereUniqueInput;
    create: Prisma.XOR<Prisma.InstagramClickCreateInput, Prisma.InstagramClickUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InstagramClickUpdateInput, Prisma.InstagramClickUncheckedUpdateInput>;
};
export type InstagramClickDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
    where: Prisma.InstagramClickWhereUniqueInput;
};
export type InstagramClickDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InstagramClickWhereInput;
    limit?: number;
};
export type InstagramClickDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InstagramClickSelect<ExtArgs> | null;
    omit?: Prisma.InstagramClickOmit<ExtArgs> | null;
    include?: Prisma.InstagramClickInclude<ExtArgs> | null;
};
