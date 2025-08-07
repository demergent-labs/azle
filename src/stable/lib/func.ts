import { IDL } from '@dfinity/candid';

export type GenericFuncArgs = [IDL.Type, ...IDL.Type[]] | [];

export function toArgsTuple(types?: IDL.Type[]): GenericFuncArgs {
    if (types === undefined) return [];
    if (Array.isArray(types)) return types as GenericFuncArgs;
    throw new Error('toArgsTuple expected an array of IDL.Type or undefined');
}
