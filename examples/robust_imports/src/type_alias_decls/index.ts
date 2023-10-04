import * as types from './types';
import * as azle from 'azle';

function offDuty() {}

const HELLO_WORLD = 'Hello, World!';

const LocalNumberAlias = types.Float64Alias;

const NumberAliases = azle.Record({
    first: types.AzleIntAlias,
    second: types.IntAlias,
    third: types.Float64Alias,
    fourth: types.MixedIntAlias,
    fifth: types.StirredIntAlias,
    sixth: types.DeepFloat32Alias,
    seventh: types.DeepFloat64Alias,
    eighth: types.DeepIntAlias,
    ninth: types.DeepInt8Alias,
    tenth: types.DeepNatAlias,
    eleventh: types.DeepNat8Alias,
    twelfth: LocalNumberAlias
});

import { MixedConcreteStar } from './types';
import { Result } from 'azle';

export const compareStars = azle.query(
    [MixedConcreteStar, MixedConcreteStar],
    Result(azle.bool, azle.text),
    (record, concrete) => {
        return azle.Result.Ok(record.star === concrete.star);
    }
);

export const helloTextAlias = azle.query([], types.TextAlias, () => {
    return HELLO_WORLD;
});

export const helloAzleTextAlias = azle.query([], types.AzleTextAlias, () => {
    return HELLO_WORLD;
});

export const helloMixedTextAlias = azle.query([], types.MixedTextAlias, () => {
    return HELLO_WORLD;
});

export const helloDeepTextAlias = azle.query([], types.DeepTextAlias, () => {
    return HELLO_WORLD;
});

export const helloStirredTextAlias = azle.query(
    [],
    types.StirredTextAlias,
    () => {
        return HELLO_WORLD;
    }
);

export const getDeepBlob = azle.query(
    [types.DeepBlobAlias],
    types.DeepBlobAlias,
    (blob) => {
        return blob;
    }
);

export const deepEmptyAlias = azle.query([], types.DeepEmptyAlias, () => {
    throw 'empty';
});

export const getNumberAliases = azle.query(
    [],
    NumberAliases,
    () => {
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
    },
    { guard: offDuty }
);

export const passPrincipal = azle.query(
    [types.DeepPrincipalAlias],
    types.DeepPrincipalAlias,
    (principal) => {
        return principal;
    }
);

export const getReservedAlias = azle.query([], types.DeepReservedAlias, () => {
    return 'anything';
});

export const simpleDeepQuery = types.Deep$queryAlias(
    [],
    types.VoidAlias,
    () => {
        console.log(HELLO_WORLD);
    }
);

export const simpleAzleQuery = types.Azle$queryAlias(
    [],
    types.VoidAlias,
    () => {
        console.log(HELLO_WORLD);
    }
);

export const simpleQuery = types.$queryAlias([], types.VoidAlias, () => {
    console.log(HELLO_WORLD);
});

const AliasedCanister = types.DeepCanisterAlias({
    testQuery: types.$queryAlias([], azle.text)
});

export const AliasedCanisterAlias = AliasedCanister;

export const checkCanisterAlias = azle.query(
    [AliasedCanister],
    AliasedCanister,
    (canister) => {
        return canister;
    }
);

export type MyLocalNumberAlias = number;
export const MyDeepRecordFromAlias = types.DeepRecordAlias({
    depth: azle.nat8
});
export const MyDeepVariantFromAlias = types.DeepVariantAlias({
    good: azle.Null,
    bad: azle.Null,
    ugly: azle.Null
});
export const MyAliasToMyDeepRecordFromAlias = MyDeepRecordFromAlias;
export const MyRecordFromAlias = types.RecordAlias({
    id: azle.nat,
    name: types.DeepOptAlias(azle.text),
    depth: MyAliasToMyDeepRecordFromAlias,
    tups: types.DeepTupleAlias(azle.text, types.Float64Alias),
    description: MyDeepVariantFromAlias,
    list: types.DeepVecAlias(azle.nat16)
});
export const MyRecordFromAliasAlias = MyRecordFromAlias;
export const SuperAlias = MyRecordFromAliasAlias;

export const getMyRecord = azle.query([], MyRecordFromAlias, () => {
    return {
        id: 7n,
        name: azle.Some('Bob'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
});

export const getMyRecordAlias = azle.query([], MyRecordFromAliasAlias, () => {
    return {
        id: 8n,
        name: azle.Some('Alice'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
});

export const getSuperAlias = azle.query([], SuperAlias, () => {
    return {
        id: 9n,
        name: azle.Some('Eve'),
        depth: { depth: 3 },
        tups: ['Hello', 1.23],
        description: { ugly: null },
        list: [1, 2, 3, 4, 5, 6, 7]
    };
});

export const getManualAlias = azle.query(
    [],
    types.DeepManualAlias(azle.float64),
    () => {
        azle.ic.reply(9.87, azle.float64);
    },
    { manual: true }
);

const MyFuncFromAlias = types.DeepFuncAlias([azle.text], azle.text, 'query');

export const returnFuncAlias = azle.query(
    [MyFuncFromAlias],
    MyFuncFromAlias,
    (func) => {
        return func;
    }
);

let stableMap = types.DeepStableBTreeMapAlias(azle.nat16, azle.text, 1);

export const setStable = azle.update(
    [azle.nat16, azle.text],
    types.DeepOptAlias(azle.text),
    (key, value) => {
        return stableMap.insert(key, value);
    }
);

export const getStable = azle.query(
    [azle.nat16],
    types.DeepOptAlias(azle.text),
    (key) => {
        return stableMap.get(key);
    }
);
