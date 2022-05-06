import type { Principal } from '@dfinity/principal';
export interface Bling { 'id' : string }
export type Reaction = { 'one' : null } |
  { 'two' : null } |
  { 'three' : { 'id' : string } };
export interface Test { 'id' : string }
export interface Test1 { 'id' : string }
export type TestVariant = { 'prop1' : string } |
  { 'prop2' : Test1 };
export interface Thing { 'id' : string }
export interface User { 'id' : string }
export interface User1 {
  'id' : string,
  'job' : { 'id' : string, 'title' : string },
}
export type UserVariant = { 'prop1' : null };
export interface _SERVICE {
  'inlineRecordParam' : (arg_0: { 'prop1' : string }) => Promise<string>,
  'inlineRecordReturnType' : () => Promise<
      { 'prop1' : string, 'prop2' : string }
    >,
  'inlineVariantParam' : (
      arg_0: { 'var1' : null } |
        { 'var2' : null },
    ) => Promise<{ 'var1' : null } | { 'var2' : null }>,
  'inlineVariantReturnType' : () => Promise<
      { 'var1' : null } |
        { 'var2' : null } |
        { 'var3' : null }
    >,
  'recordReferencingOtherTypesFromReturnType' : () => Promise<
      { 'prop1' : string, 'prop2' : Thing }
    >,
  'recordReferencingRecordFromParam' : (arg_0: { 'test' : Test }) => Promise<
      string
    >,
  'recordReferencingVariantFromParam' : (
      arg_0: { 'testVariant' : TestVariant },
    ) => Promise<[] | [string]>,
  'recordWithInlineFields' : () => Promise<User1>,
  'variantReferencingOtherTypesFromReturnType' : () => Promise<
      { 'prop1' : string } |
        { 'prop2' : Bling }
    >,
  'variantReferencingRecordFromParam' : (arg_0: { 'prop1' : User }) => Promise<
      undefined
    >,
  'variantReferencingVariantFromParam' : (
      arg_0: { 'prop1' : UserVariant },
    ) => Promise<undefined>,
  'variantWithInlineFields' : () => Promise<Reaction>,
}
