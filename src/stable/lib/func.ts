import { IDL } from '@dfinity/candid';

// TODO: Remove type after https://github.com/demergent-labs/azle/issues/3382 is resolved
// TODO: License info: https://github.com/dfinity/agent-js/blob/main/LICENSE
export type GenericFuncArgs = [IDL.Type, ...IDL.Type[]] | [];

export function toArgsTuple(types?: IDL.Type[]): GenericFuncArgs {
    if (types === undefined) return [];
    if (Array.isArray(types)) return types as GenericFuncArgs;
    throw new Error('toArgsTuple expected an array of IDL.Type or undefined');
}
