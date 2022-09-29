import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/stable_storage';
import { Principal } from '@dfinity/principal';

const stable_storage_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const initial_reads: Test[] = [
    {
        name: 'initial read of readStableBlob',
        test: async () => {
            const result = await stable_storage_canister.readStableBlob();

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
        name: 'initial read of readStableBlobs',
        test: async () => {
            const result = await stable_storage_canister.readStableBlobs();

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
        name: 'initial read of readStableInt',
        test: async () => {
            const result = await stable_storage_canister.readStableInt();

            return {
                ok:
                    result ===
                    170_141_183_460_469_231_731_687_303_715_884_105_727n
            };
        }
    },
    {
        name: 'initial read of readStableInts',
        test: async () => {
            const result = await stable_storage_canister.readStableInts();

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
        name: 'initial read of readStableInt64',
        test: async () => {
            const result = await stable_storage_canister.readStableInt64();

            return {
                ok: result === 9_223_372_036_854_775_807n
            };
        }
    },
    {
        name: 'initial read of readStableInt32',
        test: async () => {
            const result = await stable_storage_canister.readStableInt32();

            return {
                ok: result === 2_147_483_647
            };
        }
    },
    {
        name: 'initial read of readStableInt16',
        test: async () => {
            const result = await stable_storage_canister.readStableInt16();

            return {
                ok: result === 32_767
            };
        }
    },
    {
        name: 'initial read of readStableInt8',
        test: async () => {
            const result = await stable_storage_canister.readStableInt8();

            return {
                ok: result === 127
            };
        }
    },
    {
        name: 'initial read of readStableNat',
        test: async () => {
            const result = await stable_storage_canister.readStableNat();

            return {
                ok:
                    result ===
                    340_282_366_920_938_463_463_374_607_431_768_211_455n
            };
        }
    },
    {
        name: 'initial read of readStableNat64',
        test: async () => {
            const result = await stable_storage_canister.readStableNat64();

            return {
                ok: result === 18_446_744_073_709_551_615n
            };
        }
    },
    {
        name: 'initial read of readStableNat32',
        test: async () => {
            const result = await stable_storage_canister.readStableNat32();

            return {
                ok: result === 4_294_967_295
            };
        }
    },
    {
        name: 'initial read of readStableNat16',
        test: async () => {
            const result = await stable_storage_canister.readStableNat16();

            return {
                ok: result === 65_535
            };
        }
    },
    {
        name: 'initial read of readStableNat8',
        test: async () => {
            const result = await stable_storage_canister.readStableNat8();

            return {
                ok: result === 255
            };
        }
    },
    {
        name: 'initial read of readStableString',
        test: async () => {
            const result = await stable_storage_canister.readStableString();

            return {
                ok: result === 'Hello there'
            };
        }
    },
    {
        name: 'initial read of readStablePrincipal',
        test: async () => {
            const result = await stable_storage_canister.readStablePrincipal();

            return {
                ok: result.toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
            };
        }
    },
    {
        name: 'initial read of readStableUser',
        test: async () => {
            const result = await stable_storage_canister.readStableUser();

            return {
                ok:
                    result.id === '0' &&
                    // 'CANADA' in result.country &&
                    result.children.length === 1 &&
                    result.children[0].id === '1'
            };
        }
    }
    // {
    //     name: 'initial read of readStableReaction',
    //     test: async () => {
    //         const result = await stable_storage_canister.readStableReaction();

    //         return {
    //             ok: 'Emotion' in result && 'Happy' in result.Emotion
    //         };
    //     }
    // }
];

const writes: Test[] = [
    {
        name: 'writeStableBlob',
        test: async () => {
            const result = await stable_storage_canister.writeStableBlob([
                5, 4, 3, 2, 1, 0
            ]);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableBlobs',
        test: async () => {
            const result = await stable_storage_canister.writeStableBlobs([
                [5, 4, 3, 2, 1, 0],
                [5, 4, 3, 2, 1, 0]
            ]);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInt',
        test: async () => {
            const result = await stable_storage_canister.writeStableInt(0n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInts',
        test: async () => {
            const result = await stable_storage_canister.writeStableInts([
                0n,
                0n
            ]);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInt64',
        test: async () => {
            const result = await stable_storage_canister.writeStableInt64(1n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInt32',
        test: async () => {
            const result = await stable_storage_canister.writeStableInt32(2);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInt16',
        test: async () => {
            const result = await stable_storage_canister.writeStableInt16(3);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableInt8',
        test: async () => {
            const result = await stable_storage_canister.writeStableInt8(4);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableNat',
        test: async () => {
            const result = await stable_storage_canister.writeStableNat(5n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableNat64',
        test: async () => {
            const result = await stable_storage_canister.writeStableNat64(6n);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableNat32',
        test: async () => {
            const result = await stable_storage_canister.writeStableNat32(7);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableNat16',
        test: async () => {
            const result = await stable_storage_canister.writeStableNat16(8);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableNat8',
        test: async () => {
            const result = await stable_storage_canister.writeStableNat8(9);

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableString',
        test: async () => {
            const result = await stable_storage_canister.writeStableString(
                'Yes sir!'
            );

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStablePrincipal',
        test: async () => {
            const result = await stable_storage_canister.writeStablePrincipal(
                Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
            );

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStableUser',
        test: async () => {
            const result = await stable_storage_canister.writeStableUser({
                id: '2',
                // country: {
                //     UK: null
                // },
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
    }
    // {
    //     name: 'writeStableReaction',
    //     test: async () => {
    //         const result = await stable_storage_canister.writeStableReaction({
    //             Fireworks: {
    //                 id: '0',
    //                 name: 'Mega Firework'
    //             }
    //         });

    //         return {
    //             ok: result === undefined
    //         };
    //     }
    // }
];

const check_writes: Test[] = [
    {
        name: 'check writeStableBlob',
        test: async () => {
            const result = await stable_storage_canister.readStableBlob();

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
        name: 'check writeStableBlobs',
        test: async () => {
            const result = await stable_storage_canister.readStableBlobs();

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
        name: 'check writeStableInt',
        test: async () => {
            const result = await stable_storage_canister.readStableInt();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'check writeStableInts',
        test: async () => {
            const result = await stable_storage_canister.readStableInts();

            return {
                ok: result[0] === 0n && result[1] === 0n
            };
        }
    },
    {
        name: 'check writeStableInt64',
        test: async () => {
            const result = await stable_storage_canister.readStableInt64();

            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'check writeStableInt32',
        test: async () => {
            const result = await stable_storage_canister.readStableInt32();

            return {
                ok: result === 2
            };
        }
    },
    {
        name: 'check writeStableInt16',
        test: async () => {
            const result = await stable_storage_canister.readStableInt16();

            return {
                ok: result === 3
            };
        }
    },
    {
        name: 'check writeStableInt8',
        test: async () => {
            const result = await stable_storage_canister.readStableInt8();

            return {
                ok: result === 4
            };
        }
    },
    {
        name: 'check writeStableNat',
        test: async () => {
            const result = await stable_storage_canister.readStableNat();

            return {
                ok: result === 5n
            };
        }
    },
    {
        name: 'check writeStableNat64',
        test: async () => {
            const result = await stable_storage_canister.readStableNat64();

            return {
                ok: result === 6n
            };
        }
    },
    {
        name: 'check writeStableNat32',
        test: async () => {
            const result = await stable_storage_canister.readStableNat32();

            return {
                ok: result === 7
            };
        }
    },
    {
        name: 'check writeStableNat16',
        test: async () => {
            const result = await stable_storage_canister.readStableNat16();

            return {
                ok: result === 8
            };
        }
    },
    {
        name: 'check writeStableNat8',
        test: async () => {
            const result = await stable_storage_canister.readStableNat8();

            return {
                ok: result === 9
            };
        }
    },
    {
        name: 'check writeStableString',
        test: async () => {
            const result = await stable_storage_canister.readStableString();

            return {
                ok: result === 'Yes sir!'
            };
        }
    },
    {
        name: 'check writeStablePrincipal',
        test: async () => {
            const result = await stable_storage_canister.readStablePrincipal();

            return {
                ok: result.toText() === 'ryjl3-tyaaa-aaaaa-aaaba-cai'
            };
        }
    },
    {
        name: 'check writeStableUser',
        test: async () => {
            const result = await stable_storage_canister.readStableUser();

            return {
                ok:
                    result.id === '2' &&
                    // 'UK' in result.country &&
                    result.children.length === 1 &&
                    result.children[0].id === '3'
            };
        }
    }
    // {
    //     name: 'check writeStableReaction',
    //     test: async () => {
    //         const result = await stable_storage_canister.readStableReaction();

    //         return {
    //             ok:
    //                 'Fireworks' in result &&
    //                 result.Fireworks.id === '0' &&
    //                 result.Fireworks.name === 'Mega Firework'
    //         };
    //     }
    // }
];

const tests: Test[] = [
    ...deploy('stable_storage'),
    ...initial_reads,
    ...writes,
    ...check_writes,
    {
        name: 'deploy',
        prep: async () => {
            execSync(
                `dfx canister install --mode upgrade --upgrade-unchanged --wasm target/wasm32-unknown-unknown/release/stable_storage.wasm.gz stable_storage`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    ...check_writes
];

run_tests(tests);
