import { GenericIdlFuncArgs, IDL } from '@icp-sdk/core/candid';

export function toFuncArgs(types?: IDL.Type[]): GenericIdlFuncArgs {
    if (types === undefined) return [];
    if (Array.isArray(types)) return types as GenericIdlFuncArgs;
    throw new Error('toFuncArgs expected IDL.Type[] or undefined');
}
