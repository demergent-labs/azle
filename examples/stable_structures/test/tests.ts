import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
import { Reaction, User } from '../src/types';
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';
import { _SERVICE as CANISTER3_SERVICE } from './dfx_generated/canister3/canister3.did';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import {
    blob,
    float32,
    float64,
    int,
    nat,
    nat16,
    nat32,
    nat64,
    nat8
} from 'azle';

type _SERVICE = CANISTER1_SERVICE | CANISTER2_SERVICE | CANISTER3_SERVICE;

const HELLO_BYTES = [104, 101, 108, 108, 111];
const STABLE_MAP_KEYS: [
    nat8,
    nat16,
    nat32,
    typeof Reaction,
    typeof User,
    string[], //Opt?
    BigUint64Array,
    null,
    boolean,
    float64,
    float32,
    nat,
    blob,
    string
] = [
    0,
    0,
    0,
    {
        Happy: null
    },
    {
        username: 'username',
        posts: [
            {
                title: 'MyBlogPost'
            }
        ]
    },
    ['world'],
    new BigUint64Array([1n, 2n, 3n, 4n, 5n]),
    null,
    false,
    0,
    10.23,
    0n,
    new Uint8Array(HELLO_BYTES),
    'hello'
];

const STABLE_MAP_KEYSCOMPS: [
    (a: nat8 | undefined, b: nat8) => boolean,
    (a: nat16 | undefined, b: nat16) => boolean,
    (a: nat32 | undefined, b: nat32) => boolean,
    (a: typeof Reaction | undefined, b: typeof Reaction) => boolean,
    (a: typeof User | undefined, b: typeof User) => boolean,
    (a: string[] | undefined, b: string[]) => boolean,
    (a: BigUint64Array | undefined, b: BigInt64Array) => boolean,
    (a: null | undefined, b: null) => boolean,
    (a: boolean | undefined, b: boolean) => boolean,
    (a: float64 | undefined, b: float64) => boolean,
    (a: float32 | undefined, b: float32) => boolean,
    (a: nat | undefined, b: nat) => boolean,
    (a: blob | undefined, b: blob) => boolean,
    (a: string | undefined, b: string) => boolean
] = [
    simpleEquals,
    simpleEquals,
    simpleEquals,
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simpleEquals,
    simpleEquals,
    simpleEquals,
    (a, b) => a?.toFixed(2) === b.toFixed(2),
    simpleEquals,
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simpleEquals
];

const STABLEMAPVALUES: [
    string,
    blob,
    nat,
    int,
    float32,
    float64,
    boolean,
    null,
    null,
    string[],
    boolean[],
    typeof User,
    typeof Reaction,
    Principal
] = [
    'hello',
    new Uint8Array(HELLO_BYTES),
    2n,
    2n,
    4,
    5,
    true,
    null,
    null,
    ['hello', 'world'],
    [true],
    {
        username: 'username2',
        posts: [
            {
                title: 'BlagPost'
            }
        ]
    },
    { Sad: null },
    Principal.fromText('aaaaa-aa')
];

const STABLEMAPVALUECOMPS: [
    (a: string | undefined, b: string) => boolean,
    (a: blob | undefined, b: blob) => boolean,
    (a: nat | undefined, b: nat) => boolean,
    (a: int | undefined, b: int) => boolean,
    (a: float32 | undefined, b: float32) => boolean,
    (a: float64 | undefined, b: float64) => boolean,
    (a: boolean | undefined, b: boolean) => boolean,
    (a: null | undefined, b: null) => boolean,
    (a: null | undefined, b: null) => boolean,
    (a: string[] | undefined, b: string[]) => boolean,
    (a: boolean[] | undefined, b: boolean[]) => boolean,
    (a: typeof User | undefined, b: typeof User) => boolean,
    (a: typeof Reaction | undefined, b: typeof Reaction) => boolean,
    (a: Principal | undefined, b: Principal) => boolean
] = [
    simpleEquals,
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simpleEquals,
    simpleEquals,
    simpleEquals,
    simpleEquals,
    simpleEquals,
    (a, b) => (a === undefined ? true : a === b), // See https://github.com/demergent-labs/azle/issues/847
    (a, b) => (a === undefined ? true : a === b), // See https://github.com/demergent-labs/azle/issues/847
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) =>
        a !== undefined &&
        a.username === b.username &&
        a.posts[0].title === b.posts[0].title,
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) => a !== undefined && a.toText() === b.toText()
];

export function getTests(
    stableStructuresCanister_1: ActorSubclass<CANISTER1_SERVICE>,
    stableStructuresCanister_2: ActorSubclass<CANISTER2_SERVICE>,
    stableStructuresCanister_3: ActorSubclass<CANISTER3_SERVICE>
): Test[] {
    return [
        ...preRedeployTests(stableStructuresCanister_1, 0, 4),
        ...preRedeployTests(stableStructuresCanister_2, 5, 9),
        ...preRedeployTests(stableStructuresCanister_3, 10, 13),
        {
            name: 'redeploy canisters',
            prep: async () => {
                execSync('dfx deploy --upgrade-unchanged', {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'getRedeployed',
            test: async () => {
                const result1 =
                    await stableStructuresCanister_1.getRedeployed();
                const result2 =
                    await stableStructuresCanister_2.getRedeployed();
                const result3 =
                    await stableStructuresCanister_3.getRedeployed();
                return {
                    Ok: result1 === true && result2 === true && result3 === true
                };
            }
        },
        ...postRedeployTests(stableStructuresCanister_1, 0, 4),
        ...postRedeployTests(stableStructuresCanister_2, 5, 9),
        ...postRedeployTests(stableStructuresCanister_3, 10, 13)
    ];
}

export function preRedeployTests(
    canister: ActorSubclass<_SERVICE>,
    start: number,
    end: number
): Test[] {
    const range = (_: Test, index: number) => index >= start && index <= end;

    return [
        ...getReturnsEmpty(canister).filter(range),
        ...isEmptyReturns(true, 'before insert', canister).filter(range),
        ...lenReturns(0n, 'before insert', canister).filter(range),
        ...containsKeyReturns(false, 'before insert', canister).filter(range),
        ...keysIsLength(0, 'before insert', canister).filter(range),
        ...valuesIsLength(0, 'before insert', canister).filter(range),
        ...itemsIsLength(0, 'before insert', canister).filter(range),

        ...insert(canister).filter(range),

        ...containsKeyReturns(true, 'after insert', canister).filter(range),
        ...isEmptyReturns(false, 'after insert', canister).filter(range),
        ...lenReturns(1n, 'after insert', canister).filter(range),
        ...getReturnsExpectedValue('after insert', canister).filter(range),
        ...keysIsLength(1, 'after insert', canister).filter(range),
        ...valuesIsLength(1, 'after insert', canister).filter(range),
        ...itemsIsLength(1, 'after insert', canister).filter(range)
    ];
}

export function postRedeployTests(
    canister: ActorSubclass<_SERVICE>,
    start: number,
    end: number
): Test[] {
    const range = (_: Test, index: number) => index >= start && index <= end;

    return [
        ...getReturnsExpectedValue('post redeploy', canister).filter(range),
        ...keysIsLength(1, 'after insert', canister).filter(range),
        ...valuesIsLength(1, 'after insert', canister).filter(range),
        ...itemsIsLength(1, 'after insert', canister).filter(range),
        ...remove(canister).filter(range),
        ...containsKeyReturns(false, 'after remove', canister).filter(range)
    ];
}

function containsKeyReturns(
    shouldContain: boolean,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stableMapKey, index) => {
        return {
            name: `stableMap${index}.containsKey(), ${suffix}, returns ${shouldContain}`,
            test: async () => {
                const setResult = await (stableStructuresCanister as any)[
                    `stableMap${index}ContainsKey`
                ](stableMapKey);

                return {
                    Ok: setResult === shouldContain
                };
            }
        };
    });
}

function getReturnsEmpty(
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stableMapKey, index) => {
        return {
            name: `stableMap${index}.get() returns an empty Opt`,
            test: async () => {
                const getResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Get`
                ](stableMapKey);

                return {
                    Ok: isEmptyOpt(getResult)
                };
            }
        };
    });
}

function getReturnsExpectedValue(
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stableMapKey, index) => {
        const valueComp: (a: any, b: any) => boolean =
            STABLEMAPVALUECOMPS[index];
        return {
            name: `stableMap${index}.get(), ${suffix}, contains the expected value`,
            test: async () => {
                const getResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Get`
                ](stableMapKey);

                return {
                    Ok: valueComp(getResult[0], STABLEMAPVALUES[index])
                };
            }
        };
    });
}

function insert(stableStructuresCanister: ActorSubclass<_SERVICE>): Test[] {
    return STABLE_MAP_KEYS.map((key, index) => {
        return {
            name: `stableMap${index}.insert() doesn't error out, and returns an empty Opt`,
            test: async () => {
                const setResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Insert`
                ](key, STABLEMAPVALUES[index]);

                return {
                    Ok: isEmptyOpt(setResult)
                };
            }
        };
    });
}

function isEmptyReturns(
    shouldBeEmpty: boolean,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((Value, index) => {
        return {
            name: `stableMap${index}.isEmpty(), ${suffix}, returns ${shouldBeEmpty}`,
            test: async () => {
                const result = await (stableStructuresCanister as any)[
                    `stableMap${index}IsEmpty`
                ]();

                return {
                    Ok: result === shouldBeEmpty
                };
            }
        };
    });
}

function itemsIsLength(
    length: number,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((key, index) => {
        return {
            name: `stableMap${index}.items(), ${suffix}, returns ${length} ${
                length === 1 ? 'item' : 'items'
            }`,
            test: async () => {
                let keyComp: (a: any, b: any) => boolean =
                    STABLE_MAP_KEYSCOMPS[index];
                let valueComp: (a: any, b: any) => boolean =
                    STABLEMAPVALUECOMPS[index];
                const itemsResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Items`
                ]();

                return {
                    Ok:
                        (length === 0 && isEmptyArray(itemsResult)) ||
                        (length === 1 &&
                            keyComp(
                                itemsResult[0][0],
                                STABLE_MAP_KEYS[index]
                            ) &&
                            valueComp(
                                itemsResult[0][1],
                                STABLEMAPVALUES[index]
                            ))
                };
            }
        };
    });
}

function keysIsLength(
    length: number,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((key, index) => {
        return {
            name: `stableMap${index}.keys(), ${suffix}, returns ${length} ${
                length === 1 ? 'key' : 'keys'
            }`,
            test: async () => {
                let keyComp: (a: any, b: any) => boolean =
                    STABLE_MAP_KEYSCOMPS[index];
                const keysResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Keys`
                ]();

                return {
                    Ok:
                        (length === 0 && isEmptyArray(keysResult)) ||
                        (length === 1 &&
                            keyComp(keysResult[0], STABLE_MAP_KEYS[index]))
                };
            }
        };
    });
}

function lenReturns(
    expectedLen: nat64,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((Value, index) => {
        return {
            name: `stableMap${index}.len(), ${suffix}, returns ${expectedLen}`,
            test: async () => {
                const result = await (stableStructuresCanister as any)[
                    `stableMap${index}Len`
                ]();

                return {
                    Ok: result === expectedLen
                };
            }
        };
    });
}

function remove(stableStructuresCanister: ActorSubclass<_SERVICE>): Test[] {
    return STABLE_MAP_KEYS.map((stableMapKeys, index) => {
        let valueComp: (a: any, b: any) => boolean = STABLEMAPVALUECOMPS[index];
        return {
            name: `stableMap${index}.remove() returns the previously stored value`,
            test: async () => {
                const getResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Remove`
                ](stableMapKeys);

                return {
                    Ok: valueComp(getResult[0], STABLEMAPVALUES[index])
                };
            }
        };
    });
}

function valuesIsLength(
    length: number,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLEMAPVALUES.map((key, index) => {
        return {
            name: `stableMap${index}.values(), ${suffix}, returns ${length} ${
                length === 1 ? 'value' : 'values'
            }`,
            test: async () => {
                let valueComp: (a: any, b: any) => boolean =
                    STABLEMAPVALUECOMPS[index];
                const valuesResult = await (stableStructuresCanister as any)[
                    `stableMap${index}Values`
                ]();

                return {
                    Ok:
                        (length === 0 && isEmptyArray(valuesResult)) ||
                        (length === 1 &&
                            valueComp(valuesResult[0], STABLEMAPVALUES[index]))
                };
            }
        };
    });
}

/**
 * Determines whether the provided value is an empty array
 * @param value the value to test.
 * @returns `true` if the provided value is an empty array, `false` otherwise.
 */
function isEmptyArray(value: any): boolean {
    return (
        (Array.isArray(value) ||
            value instanceof Uint8Array ||
            value instanceof Uint16Array ||
            value instanceof Uint32Array ||
            value instanceof BigUint64Array) &&
        value.length === 0
    );
}

/**
 * Determines whether the provided value is an Opt<T> or not.
 * @param value the value to test.
 * @returns `true` if the provided value is an empty Opt<T>, `false` otherwise.
 */
function isEmptyOpt(value: any): boolean {
    return isEmptyArray(value);
}

function simpleEquals(a: any, b: any): boolean {
    return a === b;
}
