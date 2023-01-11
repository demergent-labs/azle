import { ok, Test } from 'azle/test';
import {
    Reaction,
    User,
    _SERVICE
} from './dfx_generated/stable_structures/stable_structures.did';
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
        blog_posts: [
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

const STABLE_MAP_KEYS_COMPS: [
    (a: nat8 | undefined, b: nat8) => boolean,
    (a: nat16 | undefined, b: nat16) => boolean,
    (a: nat32 | undefined, b: nat32) => boolean,
    (a: Reaction | undefined, b: Reaction) => boolean,
    (a: User | undefined, b: User) => boolean,
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
    simple_equals,
    simple_equals,
    simple_equals,
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simple_equals,
    simple_equals,
    simple_equals,
    (a, b) => a?.toFixed(2) === b.toFixed(2),
    simple_equals,
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simple_equals
];

const STABLE_MAP_VALUES: [
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
        blog_posts: [
            {
                title: 'BlagPost'
            }
        ]
    },
    { Sad: null },
    Principal.fromText('aaaaa-aa')
];

const STABLE_MAP_VALUE_COMPS: [
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
    (a: User | undefined, b: User) => boolean,
    (a: Reaction | undefined, b: Reaction) => boolean,
    (a: Principal | undefined, b: Principal) => boolean
] = [
    simple_equals,
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    simple_equals,
    simple_equals,
    simple_equals,
    simple_equals,
    simple_equals,
    (a, b) => a === undefined, // See https://github.com/demergent-labs/azle/issues/847
    (a, b) => a === undefined, // See https://github.com/demergent-labs/azle/issues/847
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) => a !== undefined && a.every((value, index) => value === b[index]),
    (a, b) =>
        a !== undefined &&
        a.username === b.username &&
        a.blog_posts[0].title === b.blog_posts[0].title,
    (a, b) =>
        a !== undefined &&
        Object.keys(a).every((value) => Object.keys(b).includes(value)),
    (a, b) => a !== undefined && a.toText() === b.toText()
];

export function pre_redeploy_tests(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        ...get_returns_empty(stable_structures_canister),
        ...is_empty_returns(
            true,
            'before inserting',
            stable_structures_canister
        ),
        ...len_returns(0n, 'before inserting', stable_structures_canister),
        ...contains_key_returns(
            false,
            'before inserting',
            stable_structures_canister
        ),
        ...keys_is_length(0, 'before inserting', stable_structures_canister),
        ...values_is_length(0, 'before inserting', stable_structures_canister),

        ...insert(stable_structures_canister),

        ...contains_key_returns(
            true,
            'after inserting',
            stable_structures_canister
        ),
        ...is_empty_returns(
            false,
            'after inserting',
            stable_structures_canister
        ),
        ...len_returns(1n, 'after inserting', stable_structures_canister),
        ...get_returns_expected_value(
            'after inserting',
            stable_structures_canister
        ),
        ...insert_returns_insert_error(stable_structures_canister)
    ];
}

export function post_redeploy_tests(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        ...get_returns_expected_value(
            'post redeploy',
            stable_structures_canister
        ),
        ...remove(stable_structures_canister),
        ...contains_key_returns(
            false,
            'post clean up',
            stable_structures_canister
        ),
        ...insert_returns_insert_error(stable_structures_canister)
    ];
}

function contains_key_returns(
    should_contain: boolean,
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stable_map_key, index) => {
        return {
            name: `stable_map_${index}.contains_key() that exists ${suffix}`,
            test: async () => {
                const set_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_contains_key`
                ](stable_map_key);

                return {
                    ok: set_result === should_contain
                };
            }
        };
    });
}

function get_returns_empty(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stable_map_key, index) => {
        return {
            name: `stable_map_${index}.get() returns an empty Opt<T>`,
            test: async () => {
                const get_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_get`
                ](stable_map_key);

                return {
                    ok: is_empty_opt(get_result)
                };
            }
        };
    });
}

function get_returns_expected_value(
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((stable_map_key, index) => {
        const value_comp: (a: any, b: any) => boolean =
            STABLE_MAP_VALUE_COMPS[index];
        return {
            name: `stable_map_${index}.get(), ${suffix}, contains the expected value`,
            test: async () => {
                const get_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_get`
                ](stable_map_key);

                return {
                    ok: value_comp(get_result[0], STABLE_MAP_VALUES[index])
                };
            }
        };
    });
}

function insert(stable_structures_canister: ActorSubclass<_SERVICE>): Test[] {
    return STABLE_MAP_KEYS.map((key, index) => {
        return {
            name: `stable_map_${index}.insert() doesn't error out, and returns an empty Opt<T>`,
            test: async () => {
                const set_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_insert`
                ](key, STABLE_MAP_VALUES[index]);

                if (!ok(set_result)) {
                    return { err: set_result.err };
                }

                return {
                    ok: is_empty_opt(set_result.ok)
                };
            }
        };
    });
}

function is_empty_returns(
    should_be_empty: boolean,
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((_value, index) => {
        return {
            name: `stable_map_${index}.is_empty(), ${suffix}, returns ${should_be_empty}`,
            test: async () => {
                const result = await (stable_structures_canister as any)[
                    `stable_map_${index}_is_empty`
                ]();

                return {
                    ok: result === should_be_empty
                };
            }
        };
    });
}

function keys_is_length(
    length: number,
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((key, index) => {
        return {
            name: `stable_map_${index}.keys(), ${suffix}, returns ${length} ${
                length === 1 ? 'item' : 'items'
            }`,
            test: async () => {
                let key_comp: (a: any, b: any) => boolean =
                    STABLE_MAP_KEYS_COMPS[index];
                const keys_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_keys`
                ]();

                return {
                    ok:
                        (length === 0 && is_empty_array(keys_result)) ||
                        (length === 1 &&
                            key_comp(keys_result[0], STABLE_MAP_KEYS[index]))
                };
            }
        };
    });
}

function len_returns(
    expected_len: nat64,
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_KEYS.map((_value, index) => {
        return {
            name: `stable_map_${index}.len(), ${suffix}, returns ${expected_len}`,
            test: async () => {
                const result = await (stable_structures_canister as any)[
                    `stable_map_${index}_len`
                ]();

                return {
                    ok: result === expected_len
                };
            }
        };
    });
}

function remove(stable_structures_canister: ActorSubclass<_SERVICE>): Test[] {
    return STABLE_MAP_KEYS.map((stable_map_keys, index) => {
        let value_comp: (a: any, b: any) => boolean =
            STABLE_MAP_VALUE_COMPS[index];
        return {
            name: `stable_map_${index}.remove(), returns the previously stored value`,
            test: async () => {
                const get_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_remove`
                ](stable_map_keys);

                return {
                    ok: value_comp(get_result[0], STABLE_MAP_VALUES[index])
                };
            }
        };
    });
}

function values_is_length(
    length: number,
    suffix: string,
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return STABLE_MAP_VALUES.map((key, index) => {
        return {
            name: `stable_map_${index}.values(), ${suffix}, returns ${length} ${
                length === 1 ? 'item' : 'items'
            }`,
            test: async () => {
                let value_comp: (a: any, b: any) => boolean =
                    STABLE_MAP_VALUE_COMPS[index];
                const values_result = await (stable_structures_canister as any)[
                    `stable_map_${index}_values`
                ]();

                return {
                    ok:
                        (length === 0 && is_empty_array(values_result)) ||
                        (length === 1 &&
                            value_comp(
                                values_result[0],
                                STABLE_MAP_VALUES[index]
                            ))
                };
            }
        };
    });
}

export function insert_returns_insert_error(
    stable_structures_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'insert returns a KeyTooLarge error if the key is too large',
            test: async () => {
                const key_over_100_bytes =
                    '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901';
                const result =
                    await stable_structures_canister.stable_map_13_insert(
                        key_over_100_bytes,
                        Principal.fromText('aaaaa-aa')
                    );

                return {
                    ok:
                        'err' in result &&
                        'KeyTooLarge' in result.err &&
                        result.err.KeyTooLarge.given === 109 &&
                        result.err.KeyTooLarge.max === 100
                };
            }
        },
        {
            name: 'insert returns a ValueTooLarge error if the value is too large',
            test: async () => {
                const value_over_100_bytes =
                    '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901';
                const result =
                    await stable_structures_canister.stable_map_0_insert(
                        1,
                        value_over_100_bytes
                    );

                return {
                    ok:
                        'err' in result &&
                        'ValueTooLarge' in result.err &&
                        result.err.ValueTooLarge.given === 109 &&
                        result.err.ValueTooLarge.max === 100
                };
            }
        }
    ];
}

/**
 * Determines whether the provided value is an empty array
 * @param value the value to test.
 * @returns `true` if the provided value is an empty array, `false` otherwise.
 */
function is_empty_array(value: any): boolean {
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
function is_empty_opt(value: any): boolean {
    return is_empty_array(value);
}

function simple_equals(a: any, b: any): boolean {
    return a === b;
}
