import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { describe } from '@jest/globals';
import {
    blob,
    float32,
    float64,
    int,
    nat,
    nat8,
    nat16,
    nat32,
    nat64
} from 'azle/experimental';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

import { Reaction, User } from '../src/types';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER1_SERVICE } from './dfx_generated/canister1/canister1.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER2_SERVICE } from './dfx_generated/canister2/canister2.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CANISTER3_SERVICE } from './dfx_generated/canister3/canister3.did';

type _SERVICE = CANISTER1_SERVICE | CANISTER2_SERVICE | CANISTER3_SERVICE;

const HELLO_BYTES = [104, 101, 108, 108, 111];
const STABLE_MAP_KEYS: [
    nat8,
    nat16,
    nat32,
    Reaction,
    User,
    string[], //Opt?
    BigUint64Array,
    null,
    boolean,
    float64,
    float32,
    nat,
    blob,
    string,
    string,
    [Principal, string],
    string,
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
    'hello',
    'world',
    [Principal.fromText('aaaaa-aa'), 'test_method'],
    'json',
    JSON.stringify({
        hello: 'hello',
        world: 'world'
    })
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
    User,
    Reaction,
    Principal,
    [Principal, string],
    string,
    string,
    string
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
    Principal.fromText('aaaaa-aa'),
    [Principal.fromText('aaaaa-aa'), 'test_method'],
    'syrup',
    JSON.stringify({
        hello: 'hello',
        world: 'world'
    }),
    'candyland'
];

export function getTests(
    stableStructuresCanister1: ActorSubclass<CANISTER1_SERVICE>,
    stableStructuresCanister2: ActorSubclass<CANISTER2_SERVICE>,
    stableStructuresCanister3: ActorSubclass<CANISTER3_SERVICE>
): Test {
    return () => {
        describe(
            'initial tests canisters 0-4',
            preRedeployTests(stableStructuresCanister1, 0, 4)
        );
        describe(
            'initial tests canisters 5-9',
            preRedeployTests(stableStructuresCanister2, 5, 9)
        );
        describe(
            'initial tests canisters 10-17',
            preRedeployTests(stableStructuresCanister3, 10, 17)
        );

        please('redeploy canisters', async () => {
            execSync('dfx deploy --upgrade-unchanged', {
                stdio: 'inherit'
            });
        });

        it('getRedeployed', async () => {
            expect(await stableStructuresCanister1.getRedeployed()).toBe(true);
            expect(await stableStructuresCanister2.getRedeployed()).toBe(true);
            expect(await stableStructuresCanister3.getRedeployed()).toBe(true);
        });

        describe(
            'final tests canisters 0-4',
            postRedeployTests(stableStructuresCanister1, 0, 4)
        );
        describe(
            'final tests canisters 5-9',
            postRedeployTests(stableStructuresCanister2, 5, 9)
        );
        describe(
            'final tests canisters 10-17',
            postRedeployTests(stableStructuresCanister3, 10, 17)
        );
    };
}

export function preRedeployTests(
    canister: ActorSubclass<_SERVICE>,
    start: number,
    end: number
): Test {
    const range = Array.from({ length: end - start + 1 }, (v, k) => k + start);
    return () => {
        describe.each(range)('initial tests', (index) => {
            getReturnsEmpty(canister, index);
            isEmptyReturns(true, 'before insert', canister, index);
            lenReturns(0n, 'before insert', canister, index);
            containsKeyReturns(false, 'before insert', canister, index);
            keysIsLength(0, 'before insert', canister, index);
            valuesIsLength(0, 'before insert', canister, index);
            itemsIsLength(0, 'before insert', canister, index);

            insert(canister, index);

            containsKeyReturns(true, 'after insert', canister, index);
            isEmptyReturns(false, 'after insert', canister, index);
            lenReturns(1n, 'after insert', canister, index);
            getReturnsExpectedValue('after insert', canister, index);
            keysIsLength(1, 'after insert', canister, index);
            valuesIsLength(1, 'after insert', canister, index);
            itemsIsLength(1, 'after insert', canister, index);
        });
    };
}

export function postRedeployTests(
    canister: ActorSubclass<_SERVICE>,
    start: number,
    end: number
): Test {
    const range = Array.from({ length: end - start + 1 }, (v, k) => k + start);
    return () => {
        describe.each(range)('final tests', (index) => {
            getReturnsExpectedValue('post redeploy', canister, index);
            keysIsLength(1, 'after insert', canister, index);
            valuesIsLength(1, 'after insert', canister, index);
            itemsIsLength(1, 'after insert', canister, index);
            remove(canister, index);
            containsKeyReturns(false, 'after remove', canister, index);
        });
    };
}

function containsKeyReturns(
    shouldContain: boolean,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    const stableMapKey = STABLE_MAP_KEYS[index];
    it(`stableMap${index}.containsKey(), ${suffix}, returns ${shouldContain}`, async () => {
        const setResult = await (stableStructuresCanister as any)[
            `stableMap${index}ContainsKey`
        ](stableMapKey);

        expect(setResult).toBe(shouldContain);
    });
}

function getReturnsEmpty(
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    const stableMapKey = STABLE_MAP_KEYS[index];
    it(`stableMap${index}.get() returns an empty Opt`, async () => {
        const getResult = await (stableStructuresCanister as any)[
            `stableMap${index}Get`
        ](stableMapKey);

        expect(getResult).toEqual([]);
    });
}

function getReturnsExpectedValue(
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    const stableMapKey = STABLE_MAP_KEYS[index];
    it(`stableMap${index}.get(), ${suffix}, contains the expected value`, async () => {
        const getResult = await (stableStructuresCanister as any)[
            `stableMap${index}Get`
        ](stableMapKey);

        expect(getResult).toEqual([STABLEMAPVALUES[index]]);
    });
}

function insert(
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    const stableMapKey = STABLE_MAP_KEYS[index];
    it(`stableMap${index}.insert() doesn't error out, and returns an empty Opt`, async () => {
        const setResult = await (stableStructuresCanister as any)[
            `stableMap${index}Insert`
        ](stableMapKey, STABLEMAPVALUES[index]);

        expect(setResult).toEqual([]);
    });
}

function isEmptyReturns(
    shouldBeEmpty: boolean,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    it(`stableMap${index}.isEmpty(), ${suffix}, returns ${shouldBeEmpty}`, async () => {
        const result = await (stableStructuresCanister as any)[
            `stableMap${index}IsEmpty`
        ]();

        expect(result).toBe(shouldBeEmpty);
    });
}

function itemsIsLength(
    length: 0 | 1,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    it(`stableMap${index}.items(), ${suffix}, returns ${length} ${
        length === 1 ? 'item' : 'items'
    }`, async () => {
        const itemsResult = await (stableStructuresCanister as any)[
            `stableMap${index}Items`
        ]();

        if (length === 0) {
            expect(itemsResult).toHaveLength(0);
        }
        if (length === 1) {
            const expectedKey = STABLE_MAP_KEYS[index];
            const expectedValue = STABLEMAPVALUES[index];
            expect(itemsResult).toHaveLength(1);
            if (
                typeof expectedKey === 'number' &&
                !Number.isInteger(expectedKey)
            ) {
                expect(itemsResult[0]).toHaveLength(2);
                expect(itemsResult[0][0]).toBeCloseTo(expectedKey);
                expect(itemsResult[0][1]).toEqual(expectedValue);
            } else {
                expect(itemsResult[0]).toEqual([expectedKey, expectedValue]);
            }
        }
    });
}

function keysIsLength(
    length: 0 | 1,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    it(`stableMap${index}.keys(), ${suffix}, returns ${length} ${
        length === 1 ? 'key' : 'keys'
    }`, async () => {
        const keysResult = await (stableStructuresCanister as any)[
            `stableMap${index}Keys`
        ]();

        if (length === 0) {
            expect(keysResult).toHaveLength(0);
        }
        if (length === 1) {
            const expected = STABLE_MAP_KEYS[index];
            expect(keysResult).toHaveLength(1);
            if (typeof expected === 'number' && !Number.isInteger(expected)) {
                expect(keysResult[0]).toBeCloseTo(expected);
            } else {
                expect(keysResult[0]).toEqual(expected);
            }
        }
    });
}

function lenReturns(
    expectedLen: nat64,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    it(`stableMap${index}.len(), ${suffix}, returns ${expectedLen}`, async () => {
        const result = await (stableStructuresCanister as any)[
            `stableMap${index}Len`
        ]();

        expect(result).toBe(expectedLen);
    });
}

function remove(
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    const stableMapKey = STABLE_MAP_KEYS[index];
    it(`stableMap${index}.remove() returns the previously stored value`, async () => {
        const getResult = await (stableStructuresCanister as any)[
            `stableMap${index}Remove`
        ](stableMapKey);

        expect(getResult).toHaveLength(1);
        expect(getResult[0]).toEqual(STABLEMAPVALUES[index]);
    });
}

function valuesIsLength(
    length: 0 | 1,
    suffix: string,
    stableStructuresCanister: ActorSubclass<_SERVICE>,
    index: number
): void {
    it(`stableMap${index}.values(), ${suffix}, returns ${length} ${
        length === 1 ? 'value' : 'values'
    }`, async () => {
        const valuesResult = await (stableStructuresCanister as any)[
            `stableMap${index}Values`
        ]();

        if (length === 0) {
            expect(valuesResult).toHaveLength(0);
        }
        if (length === 1) {
            expect(valuesResult).toHaveLength(1);
            expect(valuesResult[0]).toEqual(STABLEMAPVALUES[index]);
        }
    });
}
