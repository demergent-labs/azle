import * as types from './types';
import * as azle from 'azle';

// TODO this doesn't work. Why not?
// function offDuty(): types.DeepGuardResultAlias {
//     return { Ok: null };
// }

// function offDuty(): azle.GuardResult {
//     return { Ok: null };
// }

const HELLO_WORLD = 'Hello, World!';

type LocalIntAlias = types.Float64Alias;

type NumberAliases = azle.Record<{
    first: types.AzleIntAlias;
    second: types.IntAlias;
    third: types.Float64Alias;
    fourth: types.MixedIntAlias;
    fifth: types.StirredIntAlias;
    sixth: types.DeepFloat32Alias;
    seventh: types.DeepFloat64Alias;
    eighth: types.DeepIntAlias;
    ninth: types.DeepInt8Alias;
    tenth: types.DeepNatAlias;
    eleventh: types.DeepNat8Alias;
    twelfth: LocalIntAlias;
}>;

azle.$query;
export function helloTextAlias(): types.TextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloAzleTextAlias(): types.AzleTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloMixedTextAlias(): types.MixedTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloDeepTextAlias(): types.DeepTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function helloStirredTextAlias(): types.StirredTextAlias {
    return HELLO_WORLD;
}

azle.$query;
export function getDeepBlob(blob: types.DeepBlobAlias): types.DeepBlobAlias {
    return blob;
}

azle.$query;
export function deepEmptyAlias(): types.DeepEmptyAlias {
    throw 'empty';
}

// azle.$query({ guard: offDuty });
azle.$query;
export function getNumberAliases(): NumberAliases {
    return {
        first: 1n,
        second: 2n,
        third: 3,
        fourth: 4n,
        fifth: 5n,
        sixth: 6,
        seventh: 7,
        eighth: 8n,
        ninth: 9,
        tenth: 10n,
        eleventh: 11,
        twelfth: 12
    };
}

azle.$query;
export function passPrincipal(
    principal: types.DeepPrincipalAlias
): types.DeepPrincipalAlias {
    return principal;
}

azle.$query;
export function getReservedAlias(): types.DeepReservedAlias {
    return 'anything';
}

types.Deep$queryAlias;
export function simpleDeepQuery(): types.VoidAlias {
    console.log(HELLO_WORLD);
}

/*
DeepServiceAlias
*/

class AliasedService extends types.DeepServiceAlias {
    @azle.serviceQuery
    testQuery: () => azle.CallResult<string>;
}
