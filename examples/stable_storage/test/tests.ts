import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/stable_storage/stable_storage.did';

export function get_tests(
    stable_storage_canister: ActorSubclass<_SERVICE>
): Test[] {
    const initial_reads = get_initial_reads(stable_storage_canister);
    const writes: Test[] = get_writes(stable_storage_canister);
    const check_writes = get_check_writes(stable_storage_canister);

    const tests: Test[] = [
        ...initial_reads,
        ...writes,
        ...check_writes,
        {
            name: 'deploy',
            prep: async () => {
                execSync(`dfx deploy`, {
                    stdio: 'inherit'
                });
            }
        },
        ...check_writes
    ];

    return tests;
}

function get_initial_reads(
    stable_storage_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'initial read of read_stable_blob',
            test: async () => {
                const result = await stable_storage_canister.read_stable_blob();

                return {
                    ok:
                        result.length === 6 &&
                        result[0] === 0 &&
                        result[1] === 1 &&
                        result[2] === 2 &&
                        result[3] === 3 &&
                        result[4] === 4 &&
                        result[5] === 5
                };
            }
        },
        {
            name: 'initial read of read_stable_blobs',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_blobs();

                return {
                    ok:
                        result.length === 2 &&
                        result[0].length === 6 &&
                        result[0][0] === 0 &&
                        result[0][1] === 1 &&
                        result[0][2] === 2 &&
                        result[0][3] === 3 &&
                        result[0][4] === 4 &&
                        result[0][5] === 5 &&
                        result[1].length === 6 &&
                        result[1][0] === 0 &&
                        result[1][1] === 1 &&
                        result[1][2] === 2 &&
                        result[1][3] === 3 &&
                        result[1][4] === 4 &&
                        result[1][5] === 5
                };
            }
        },
        {
            name: 'initial read of read_stable_int',
            test: async () => {
                const result = await stable_storage_canister.read_stable_int();

                return {
                    ok:
                        result ===
                        170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'initial read of read_stable_ints',
            test: async () => {
                const result = await stable_storage_canister.read_stable_ints();

                return {
                    ok:
                        result[0] ===
                            170_141_183_460_469_231_731_687_303_715_884_105_727n &&
                        result[1] ===
                            170_141_183_460_469_231_731_687_303_715_884_105_727n
                };
            }
        },
        {
            name: 'initial read of read_stable_int64',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int64();

                return {
                    ok: result === 9_223_372_036_854_775_807n
                };
            }
        },
        {
            name: 'initial read of read_stable_int32',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int32();

                return {
                    ok: result === 2_147_483_647
                };
            }
        },
        {
            name: 'initial read of read_stable_int16',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int16();

                return {
                    ok: result === 32_767
                };
            }
        },
        {
            name: 'initial read of read_stable_int8',
            test: async () => {
                const result = await stable_storage_canister.read_stable_int8();

                return {
                    ok: result === 127
                };
            }
        },
        {
            name: 'initial read of read_stable_nat',
            test: async () => {
                const result = await stable_storage_canister.read_stable_nat();

                return {
                    ok:
                        result ===
                        340_282_366_920_938_463_463_374_607_431_768_211_455n
                };
            }
        },
        {
            name: 'initial read of read_stable_nat64',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat64();

                return {
                    ok: result === 18_446_744_073_709_551_615n
                };
            }
        },
        {
            name: 'initial read of read_stable_nat32',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat32();

                return {
                    ok: result === 4_294_967_295
                };
            }
        },
        {
            name: 'initial read of read_stable_nat16',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat16();

                return {
                    ok: result === 65_535
                };
            }
        },
        {
            name: 'initial read of read_stable_nat8',
            test: async () => {
                const result = await stable_storage_canister.read_stable_nat8();

                return {
                    ok: result === 255
                };
            }
        },
        {
            name: 'initial read of read_stable_string',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_string();

                return {
                    ok: result === 'Hello there'
                };
            }
        },
        {
            name: 'initial read of read_stable_principal',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_principal();

                return {
                    ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        },
        {
            name: 'initial read of read_stable_user',
            test: async () => {
                const result = await stable_storage_canister.read_stable_user();

                return {
                    ok:
                        result.id === '0' &&
                        result.children.length === 1 &&
                        result.children[0].id === '1'
                };
            }
        },
        {
            name: 'initial read of read_stable_reaction',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_reaction();

                return {
                    ok: 'Fire' in result
                };
            }
        },
        {
            name: 'initial read of read_stable_func',
            test: async () => {
                const result = await stable_storage_canister.read_stable_func();

                return {
                    ok:
                        result[0].toText() === 'aaaaa-aa' &&
                        result[1] === 'raw_rand'
                };
            }
        },
        {
            name: 'initial read of read_stable_boolean',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_boolean();

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'initial read of read_stable_null',
            test: async () => {
                const result = await stable_storage_canister.read_stable_null();

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'initial read of read_stable_opt',
            test: async () => {
                const result = await stable_storage_canister.read_stable_opt();

                return {
                    ok: result.length === 0
                };
            }
        }
    ];
}

function get_writes(stable_storage_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'write_stable_blob',
            test: async () => {
                const result = await stable_storage_canister.write_stable_blob(
                    Uint8Array.from([5, 4, 3, 2, 1, 0])
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_blobs',
            test: async () => {
                const result = await stable_storage_canister.write_stable_blobs(
                    [
                        Uint8Array.from([5, 4, 3, 2, 1, 0]),
                        Uint8Array.from([5, 4, 3, 2, 1, 0])
                    ]
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_int',
            test: async () => {
                const result = await stable_storage_canister.write_stable_int(
                    0n
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_ints',
            test: async () => {
                const result = await stable_storage_canister.write_stable_ints([
                    0n,
                    0n
                ]);

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_int64',
            test: async () => {
                const result = await stable_storage_canister.write_stable_int64(
                    1n
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_int32',
            test: async () => {
                const result = await stable_storage_canister.write_stable_int32(
                    2
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_int16',
            test: async () => {
                const result = await stable_storage_canister.write_stable_int16(
                    3
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_int8',
            test: async () => {
                const result = await stable_storage_canister.write_stable_int8(
                    4
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_nat',
            test: async () => {
                const result = await stable_storage_canister.write_stable_nat(
                    5n
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_nat64',
            test: async () => {
                const result = await stable_storage_canister.write_stable_nat64(
                    6n
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_nat32',
            test: async () => {
                const result = await stable_storage_canister.write_stable_nat32(
                    7
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_nat16',
            test: async () => {
                const result = await stable_storage_canister.write_stable_nat16(
                    8
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_nat8',
            test: async () => {
                const result = await stable_storage_canister.write_stable_nat8(
                    9
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_string',
            test: async () => {
                const result =
                    await stable_storage_canister.write_stable_string(
                        'Yes sir!'
                    );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_principal',
            test: async () => {
                const result =
                    await stable_storage_canister.write_stable_principal(
                        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
                    );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_user',
            test: async () => {
                const result = await stable_storage_canister.write_stable_user({
                    id: '2',
                    children: [
                        {
                            id: '3'
                        }
                    ]
                });

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_reaction',
            test: async () => {
                const result =
                    await stable_storage_canister.write_stable_reaction({
                        Great: null
                    });

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_func',
            test: async () => {
                const result = await stable_storage_canister.write_stable_func([
                    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
                    'have_fun'
                ]);

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_boolean',
            test: async () => {
                const result =
                    await stable_storage_canister.write_stable_boolean(false);

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_null',
            test: async () => {
                const result = await stable_storage_canister.write_stable_null(
                    null
                );

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'write_stable_opt',
            test: async () => {
                const result = await stable_storage_canister.write_stable_opt([
                    3n
                ]);

                return {
                    ok: result === undefined
                };
            }
        }
    ];
}

function get_check_writes(
    stable_storage_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'check write_stable_blob',
            test: async () => {
                const result = await stable_storage_canister.read_stable_blob();

                console.log('result', result);

                return {
                    ok:
                        result.length === 6 &&
                        result[0] === 5 &&
                        result[1] === 4 &&
                        result[2] === 3 &&
                        result[3] === 2 &&
                        result[4] === 1 &&
                        result[5] === 0
                };
            }
        },
        {
            name: 'check write_stable_blobs',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_blobs();

                console.log('result', result);

                return {
                    ok:
                        result.length === 2 &&
                        result[0].length === 6 &&
                        result[0][0] === 5 &&
                        result[0][1] === 4 &&
                        result[0][2] === 3 &&
                        result[0][3] === 2 &&
                        result[0][4] === 1 &&
                        result[0][5] === 0 &&
                        result[1].length === 6 &&
                        result[1][0] === 5 &&
                        result[1][1] === 4 &&
                        result[1][2] === 3 &&
                        result[1][3] === 2 &&
                        result[1][4] === 1 &&
                        result[1][5] === 0
                };
            }
        },
        {
            name: 'check write_stable_int',
            test: async () => {
                const result = await stable_storage_canister.read_stable_int();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'check write_stable_ints',
            test: async () => {
                const result = await stable_storage_canister.read_stable_ints();

                return {
                    ok: result[0] === 0n && result[1] === 0n
                };
            }
        },
        {
            name: 'check write_stable_int64',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int64();

                return {
                    ok: result === 1n
                };
            }
        },
        {
            name: 'check write_stable_int32',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int32();

                return {
                    ok: result === 2
                };
            }
        },
        {
            name: 'check write_stable_int16',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_int16();

                return {
                    ok: result === 3
                };
            }
        },
        {
            name: 'check write_stable_int8',
            test: async () => {
                const result = await stable_storage_canister.read_stable_int8();

                return {
                    ok: result === 4
                };
            }
        },
        {
            name: 'check write_stable_nat',
            test: async () => {
                const result = await stable_storage_canister.read_stable_nat();

                return {
                    ok: result === 5n
                };
            }
        },
        {
            name: 'check write_stable_nat64',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat64();

                return {
                    ok: result === 6n
                };
            }
        },
        {
            name: 'check write_stable_nat32',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat32();

                return {
                    ok: result === 7
                };
            }
        },
        {
            name: 'check write_stable_nat16',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_nat16();

                return {
                    ok: result === 8
                };
            }
        },
        {
            name: 'check write_stable_nat8',
            test: async () => {
                const result = await stable_storage_canister.read_stable_nat8();

                return {
                    ok: result === 9
                };
            }
        },
        {
            name: 'check write_stable_string',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_string();

                return {
                    ok: result === 'Yes sir!'
                };
            }
        },
        {
            name: 'check write_stable_principal',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_principal();

                return {
                    ok: result.toText() === 'ryjl3-tyaaa-aaaaa-aaaba-cai'
                };
            }
        },
        {
            name: 'check write_stable_user',
            test: async () => {
                const result = await stable_storage_canister.read_stable_user();

                return {
                    ok:
                        result.id === '2' &&
                        result.children.length === 1 &&
                        result.children[0].id === '3'
                };
            }
        },
        {
            name: 'check write_stable_reaction',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_reaction();

                return {
                    ok: 'Great' in result
                };
            }
        },
        {
            name: 'check write_stable_func',
            test: async () => {
                const result = await stable_storage_canister.read_stable_func();

                return {
                    ok:
                        result[0].toText() === 'ryjl3-tyaaa-aaaaa-aaaba-cai' &&
                        result[1] === 'have_fun'
                };
            }
        },
        {
            name: 'check write_stable_boolean',
            test: async () => {
                const result =
                    await stable_storage_canister.read_stable_boolean();

                return {
                    ok: result === false
                };
            }
        },
        {
            name: 'check write_stable_null',
            test: async () => {
                const result = await stable_storage_canister.read_stable_null();

                return {
                    ok: result === null
                };
            }
        },
        {
            name: 'check write_stable_opt',
            test: async () => {
                const result = await stable_storage_canister.read_stable_opt();

                return {
                    ok: result[0] === 3n
                };
            }
        }
    ];
}
