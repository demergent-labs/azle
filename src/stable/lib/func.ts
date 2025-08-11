import { IDL } from '@dfinity/candid';

// TODO: Remove type after https://github.com/demergent-labs/azle/issues/3382 is resolved
// TODO: License info: https://github.com/dfinity/agent-js/blob/main/LICENSE
export type GenericFuncArgs = [IDL.Type, ...IDL.Type[]] | [];

export function toFuncArgs(types?: IDL.Type[]): GenericFuncArgs {
    if (types === undefined) return [];
    if (Array.isArray(types)) return types as GenericFuncArgs;
    throw new Error('toFuncArgs expected IDL.Type[] or undefined');
}
