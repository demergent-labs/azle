import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from './dfx_generated/stable_storage';
import { Principal } from '@dfinity/principal';

const stable_storage_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const initial_reads: Test[] = [
    {
        name: 'initial read of readStableInt',
        test: async () => {
            const result = await stable_storage_canister.readStableInt();

            return {
                ok: result === 170_141_183_460_469_231_731_687_303_715_884_105_727n
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
                ok: result === 340_282_366_920_938_463_463_374_607_431_768_211_455n
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
                ok: (
                    result.id === '0' &&
                    'CANADA' in result.country &&
                    result.children.length === 1 &&
                    result.children[0].id === '1'
                )
            };
        }
    },
    {
        name: 'initial read of readStableReaction',
        test: async () => {
            const result = await stable_storage_canister.readStableReaction();

            return {
                ok: (
                    'Emotion' in result &&
                    'Happy' in result.Emotion
                )
            };
        }
    }
];

const writes: Test[] = [
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
            const result = await stable_storage_canister.writeStableString('Yes sir!');

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'writeStablePrincipal',
        test: async () => {
            const result = await stable_storage_canister.writeStablePrincipal(Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'));

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
                country: {
                    UK: null
                },
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
        name: 'writeStableReaction',
        test: async () => {
            const result = await stable_storage_canister.writeStableReaction({
                Fireworks: {
                    id: '0',
                    name: 'Mega Firework'
                }
            });

            return {
                ok: result === undefined
            };
        }
    }
];

const check_writes: Test[] = [
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
                ok: (
                    result.id === '2' &&
                    'UK' in result.country &&
                    result.children.length === 1 &&
                    result.children[0].id === '3'
                )
            };
        }
    },
    {
        name: 'check writeStableReaction',
        test: async () => {
            const result = await stable_storage_canister.readStableReaction();

            return {
                ok: (
                    'Fireworks' in result &&
                    result.Fireworks.id === '0' &&
                    result.Fireworks.name === 'Mega Firework'
                )
            };
        }
    }
];

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code stable_storage || true`, {
                stdio: 'inherit'
            });
        }
    },
    {
        // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
        name: 'waiting for createActor fetchRootKey',
        wait: 5000
    },
    {
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    ...initial_reads,
    ...writes,
    ...check_writes,
    {
        // TODO Get rid of this once https://forum.dfinity.org/t/upgrade-a-canister-even-if-the-wasm-module-hash-has-not-changed/11989
        name: 'function hack to allow a redeploy',
        prep: async () => {
            execSync(`echo "\\n\\nexport function hack(): Query<void> {}" >> src/stable_storage.ts`, {
                stdio: 'inherit'
            });
        }
    },
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

run_tests(tests);