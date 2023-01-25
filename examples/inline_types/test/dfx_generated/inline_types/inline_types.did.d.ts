import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AzleInline10480804940496767436 {
    prop1: string;
    prop2: string;
}
export type AzleInline1117332675614598022 =
    | { var1: null }
    | { var2: TestVariant };
export type AzleInline12207366142299072665 = { prop1: UserVariant };
export type AzleInline14798794118869640785 =
    | { v1: null }
    | { v2: AzleInline907043620539468992 };
export interface AzleInline16000916309646445968 {
    id: string;
    title: string;
}
export type AzleInline2478082060372207463 = { v1: null } | { v2: null };
export type AzleInline2833490720777586675 =
    | {
          ok: [] | [AzleInline8031342415594573560];
      }
    | { err: InsertError };
export type AzleInline2991347220123679547 =
    | { var1: null }
    | { var2: null }
    | { var3: null };
export type AzleInline3095728308414029725 = { var1: null } | { var2: null };
export type AzleInline4158233300510321963 =
    | { v1: null }
    | { v2: AzleInline907043620539468992 };
export interface AzleInline4325608397924534544 {
    test: Test;
}
export interface AzleInline4524627852665026661 {
    optional: [] | [bigint];
    prop1: string;
    variant: AzleInline2478082060372207463;
}
export interface AzleInline4640727576914707496 {
    prop1: string;
    prop2: Thing;
}
export type AzleInline532021583416376422 =
    | { v1: null }
    | { v2: null }
    | { v3: AzleInline907043620539468992 };
export interface AzleInline5614132538524309630 {
    opt: [] | [AzleInline8822280491885735901];
    vec: Array<AzleInline8822280491885735901>;
    primitive: string;
    func: [Principal, string];
    variant: AzleInline532021583416376422;
    record: AzleInline4524627852665026661;
}
export interface AzleInline8031342415594573560 {
    variant: AzleInline1117332675614598022;
}
export type AzleInline8263140294912128486 = { prop1: Test };
export interface AzleInline827574703489418250 {
    opt: [] | [string];
    vec: Array<string>;
    primitive: bigint;
    func: [Principal, string];
    variant: AzleInline2478082060372207463;
    record: AzleInline907043620539468992;
}
export interface AzleInline8822280491885735901 {
    opt: [] | [string];
    vec: Array<string>;
    primitive: bigint;
    func: [Principal, string];
    variant: AzleInline2478082060372207463;
    record: AzleInline907043620539468992;
}
export interface AzleInline9021281505452364202 {
    testVariant: TestVariant;
}
export interface AzleInline907043620539468992 {
    prop1: string;
}
export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
export type ManualReply =
    | { ok: AzleInline10480804940496767436 }
    | { err: string };
export type Reaction = { one: null } | { two: null } | { three: Test };
export interface Test {
    id: string;
}
export type TestVariant = { prop1: string } | { prop2: Test };
export interface Thing {
    id: string;
}
export interface User1 {
    id: string;
    job: AzleInline16000916309646445968;
}
export type UserVariant = { prop1: null };
export interface _SERVICE {
    complex: ActorMethod<
        [AzleInline5614132538524309630],
        AzleInline5614132538524309630
    >;
    inline_func: ActorMethod<[[Principal, string]], [Principal, string]>;
    inline_record_param: ActorMethod<[AzleInline907043620539468992], string>;
    inline_record_return_type: ActorMethod<[], AzleInline10480804940496767436>;
    inline_record_return_type_as_external_canister_call: ActorMethod<
        [],
        ManualReply
    >;
    inline_variant_param: ActorMethod<
        [AzleInline3095728308414029725],
        AzleInline3095728308414029725
    >;
    inline_variant_return_type: ActorMethod<[], AzleInline2991347220123679547>;
    record_referencing_other_types_from_return_type: ActorMethod<
        [],
        AzleInline4640727576914707496
    >;
    record_referencing_record_from_param: ActorMethod<
        [AzleInline4325608397924534544],
        string
    >;
    record_referencing_variant_from_param: ActorMethod<
        [AzleInline9021281505452364202],
        [] | [string]
    >;
    record_with_inline_fields: ActorMethod<[], User1>;
    stable_map_get: ActorMethod<[string], [] | [AzleInline8031342415594573560]>;
    stable_map_insert: ActorMethod<
        [string, AzleInline8031342415594573560],
        AzleInline2833490720777586675
    >;
    variant_referencing_other_types_from_return_type: ActorMethod<
        [],
        TestVariant
    >;
    variant_referencing_record_from_param: ActorMethod<
        [AzleInline8263140294912128486],
        undefined
    >;
    variant_referencing_variant_from_param: ActorMethod<
        [AzleInline12207366142299072665],
        undefined
    >;
    variant_with_inline_fields: ActorMethod<[], Reaction>;
}
