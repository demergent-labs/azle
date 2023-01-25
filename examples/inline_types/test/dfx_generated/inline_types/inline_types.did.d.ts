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
export type AzleInline15295425182523572762 =
    | { v1: null }
    | { v2: AzleInline5425011084426369860 };
export interface AzleInline16000916309646445968 {
    id: string;
    title: string;
}
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
export type AzleInline3791267007330743508 =
    | { v1: null }
    | { v2: AzleInline5425011084426369860 };
export interface AzleInline4325608397924534544 {
    test: Test;
}
export interface AzleInline4640727576914707496 {
    prop1: string;
    prop2: Thing;
}
export type AzleInline4757617411424063700 = { v1: null } | { v2: null };
export interface AzleInline5425011084426369860 {
    prop1: string;
}
export interface AzleInline6749962461773081605 {
    opt: [] | [string];
    vec: Array<string>;
    primitive: bigint;
    func: [Principal, string];
    variant: AzleInline4757617411424063700;
    record: AzleInline5425011084426369860;
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
    variant: AzleInline4757617411424063700;
    record: AzleInline5425011084426369860;
}
export interface AzleInline9021281505452364202 {
    testVariant: TestVariant;
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
    inline_func: ActorMethod<[[Principal, string]], [Principal, string]>;
    inline_record_param: ActorMethod<[AzleInline5425011084426369860], string>;
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
