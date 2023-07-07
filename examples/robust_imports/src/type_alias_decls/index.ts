import * as types from './types';
import * as azle from 'azle';

azle.$query;
export function simpleAliasQuery(): types.TextAlias {
    return 'Hello World';
}

azle.$query;
export function azleAliasQuery(): types.AzleTextAlias {
    return 'hello world';
}

azle.$query;
export function deepAliasZero(): types.DeepIntAlias {
    return 0n;
}

azle.$query;
export function mixedAliasZero(): types.MixedIntAlias {
    return 0n;
}

azle.$query;
export function mixedAliasQuery(): types.MixedTextAlias {
    return 'hello world';
}

azle.$query;
export function deepAliasQuery(): types.DeepTextAlias {
    return 'hello world';
}
