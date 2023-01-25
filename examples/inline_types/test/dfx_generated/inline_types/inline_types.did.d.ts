import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AzleInline11634736081576687661 {
    prop1: string;
    prop2: Thing;
}
export type AzleInline12153674455018255041 =
    | { var1: null }
    | { var2: TestVariant };
export type AzleInline14215406218807721013 =
    | { var1: null }
    | { var2: null }
    | { var3: null };
export interface AzleInline15804798520274070628 {
    testVariant: TestVariant;
}
export interface AzleInline15870045821780152702 {
    variant: AzleInline12153674455018255041;
}
export interface AzleInline16809542106678444233 {
    prop1: string;
}
export interface AzleInline16946487161134791485 {
    prop1: string;
    prop2: string;
}
export type AzleInline2027142959786216826 = { var1: null } | { var2: null };
export type AzleInline3802729132610108913 =
    | {
          ok: [] | [AzleInline7786076823068419125];
      }
    | { err: InsertError };
export type AzleInline5278805839780097963 = { prop1: Test };
export interface AzleInline6116640699850554434 {
    prop1: string;
    prop2: string;
}
export interface AzleInline7265323866845130613 {
    test: Test;
}
export interface AzleInline7786076823068419125 {
    variant: AzleInline12153674455018255041;
}
export interface AzleInline7827425047821939920 {
    id: string;
    title: string;
}
export type AzleInline8195216860007363499 = { prop1: UserVariant };
export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
export type ManualReply =
    | { ok: AzleInline6116640699850554434 }
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
    job: AzleInline7827425047821939920;
}
export type UserVariant = { prop1: null };
export interface _SERVICE {
    inline_record_param: ActorMethod<[AzleInline16809542106678444233], string>;
    inline_record_return_type: ActorMethod<[], AzleInline16946487161134791485>;
    inline_record_return_type_as_external_canister_call: ActorMethod<
        [],
        ManualReply
    >;
    inline_variant_param: ActorMethod<
        [AzleInline2027142959786216826],
        AzleInline2027142959786216826
    >;
    inline_variant_return_type: ActorMethod<[], AzleInline14215406218807721013>;
    record_referencing_other_types_from_return_type: ActorMethod<
        [],
        AzleInline11634736081576687661
    >;
    record_referencing_record_from_param: ActorMethod<
        [AzleInline7265323866845130613],
        string
    >;
    record_referencing_variant_from_param: ActorMethod<
        [AzleInline15804798520274070628],
        [] | [string]
    >;
    record_with_inline_fields: ActorMethod<[], User1>;
    stable_map_get: ActorMethod<
        [string],
        [] | [AzleInline15870045821780152702]
    >;
    stable_map_insert: ActorMethod<
        [string, AzleInline7786076823068419125],
        AzleInline3802729132610108913
    >;
    variant_referencing_other_types_from_return_type: ActorMethod<
        [],
        TestVariant
    >;
    variant_referencing_record_from_param: ActorMethod<
        [AzleInline5278805839780097963],
        undefined
    >;
    variant_referencing_variant_from_param: ActorMethod<
        [AzleInline8195216860007363499],
        undefined
    >;
    variant_with_inline_fields: ActorMethod<[], Reaction>;
}
