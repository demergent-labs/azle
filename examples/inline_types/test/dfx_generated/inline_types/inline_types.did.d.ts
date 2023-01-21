import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AzleInline13423010507345434471 = { var1: null } | { var2: null };
export interface AzleInline13530079310912768182 {
    prop1: string;
}
export type AzleInline14275466479066864989 =
    | { var1: null }
    | { var2: null }
    | { var3: null };
export interface AzleInline14676384386632048218 {
    test: Test;
}
export type AzleInline15488147339429212320 = { prop1: Test };
export type AzleInline156434819094452493 = { var1: null } | { var2: null };
export interface AzleInline15786395987032304672 {
    prop1: string;
    prop2: string;
}
export type AzleInline16638339814416658399 =
    | {
          ok: [] | [AzleInline1717034695179480952];
      }
    | { err: InsertError };
export interface AzleInline167177491712464616 {
    prop1: string;
    prop2: Thing;
}
export interface AzleInline1717034695179480952 {
    variant: AzleInline1777414534694048784;
}
export type AzleInline1777414534694048784 =
    | { var1: null }
    | { var2: TestVariant };
export interface AzleInline5249703271645679611 {
    testVariant: TestVariant;
}
export interface AzleInline5397522723222631180 {
    id: string;
    title: string;
}
export type AzleInline963517276188767052 = { prop1: UserVariant };
export type InsertError =
    | { ValueTooLarge: KeyTooLarge }
    | { KeyTooLarge: KeyTooLarge };
export interface KeyTooLarge {
    max: number;
    given: number;
}
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
    job: AzleInline5397522723222631180;
}
export type UserVariant = { prop1: null };
export interface _SERVICE {
    inlineRecordParam: ActorMethod<[AzleInline13530079310912768182], string>;
    inlineRecordReturnType: ActorMethod<[], AzleInline15786395987032304672>;
    inlineVariantParam: ActorMethod<
        [AzleInline13423010507345434471],
        AzleInline156434819094452493
    >;
    inlineVariantReturnType: ActorMethod<[], AzleInline14275466479066864989>;
    recordReferencingOtherTypesFromReturnType: ActorMethod<
        [],
        AzleInline167177491712464616
    >;
    recordReferencingRecordFromParam: ActorMethod<
        [AzleInline14676384386632048218],
        string
    >;
    recordReferencingVariantFromParam: ActorMethod<
        [AzleInline5249703271645679611],
        [] | [string]
    >;
    recordWithInlineFields: ActorMethod<[], User1>;
    stable_map_get: ActorMethod<[string], [] | [AzleInline1717034695179480952]>;
    stable_map_insert: ActorMethod<
        [string, AzleInline1717034695179480952],
        AzleInline16638339814416658399
    >;
    variantReferencingOtherTypesFromReturnType: ActorMethod<[], TestVariant>;
    variantReferencingRecordFromParam: ActorMethod<
        [AzleInline15488147339429212320],
        undefined
    >;
    variantReferencingVariantFromParam: ActorMethod<
        [AzleInline963517276188767052],
        undefined
    >;
    variantWithInlineFields: ActorMethod<[], Reaction>;
}
