import { cleanDeploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ic_api';

const ic_api_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    // ...cleanDeploy('cycles'), // TODO in dfx 10+ we now must use gzip to install Wasm binaries over 2mb locally
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code ic_api || true`, {
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
        name: 'canister create',
        prep: async () => {
            execSync(`dfx canister create ic_api`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'canister install',
        prep: async () => {
            execSync(
                `dfx canister install ic_api --wasm target/wasm32-unknown-unknown/release/ic_api.wasm.gz`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'caller',
        test: async () => {
            const result = await ic_api_canister.caller();

            return {
                ok: result.toText() === '2vxsx-fae'
            };
        }
    },
    {
        name: 'canister_balance',
        test: async () => {
            const result = await ic_api_canister.canister_balance();

            return {
                ok: result > 3_000_000_000_000n && result < 4_000_000_000_000n
            };
        }
    },
    {
        name: 'canister_balance128',
        test: async () => {
            const result = await ic_api_canister.canister_balance128();

            return {
                ok: result > 3_000_000_000_000n && result < 4_000_000_000_000n
            };
        }
    },
    {
        name: 'data_certificate from a query call',
        test: async () => {
            const result = await ic_api_canister.data_certificate();

            return {
                ok:
                    is_some(result) &&
                    Array.isArray(result[0]) &&
                    result[0].length > 0
            };
        }
    },
    {
        name: 'data_certificate from an update call',
        test: async () => {
            const result = await ic_api_canister.data_certificate_null();

            return {
                ok: is_none(result)
            };
        }
    },
    {
        name: 'id',
        test: async () => {
            const ic_api_canister_id = execSync(`dfx canister id ic_api`)
                .toString()
                .trim();

            const result = await ic_api_canister.id();

            return {
                ok: result.toText() === ic_api_canister_id
            };
        }
    },
    {
        name: 'performance_counter',
        test: async () => {
            const result = await ic_api_canister.performance_counter();

            console.log('performance_counter result', result);

            return {
                ok: result === 218_643n // TODO watch this, I am not sure how deterministic it is, it has changed on me once
            };
        }
    },
    {
        name: 'print',
        test: async () => {
            const result = await ic_api_canister.print('Hello World!');

            return {
                ok: result === true
            };
        }
    },
    {
        name: 'time',
        test: async () => {
            const node_time_in_nanoseconds =
                BigInt(new Date().getTime()) * 1000000n;
            const canister_time = await ic_api_canister.time();

            const difference = canister_time - node_time_in_nanoseconds;
            const positive_difference =
                difference < 0 ? difference * -1n : difference;

            // The idea is to just check that the two times are within 5 seconds of each other
            return {
                ok: positive_difference < 5 * 1_000_000_000
            };
        }
    },
    {
        name: 'trap',
        test: async () => {
            try {
                const result = await ic_api_canister.trap(
                    'here is the message'
                );

                return {
                    ok: result
                };
            } catch (error) {
                return {
                    ok:
                        (error as any).props.Message ===
                        'IC0503: Canister rrkah-fqaaa-aaaaa-aaaaq-cai trapped explicitly: here is the message'
                };
            }
        }
    }
];

run_tests(tests);

function is_none<T>(option: [] | T[]): boolean {
    return option.length === 0;
}

function is_some<T>(option: [] | T[]): boolean {
    return !is_none(option);
}
