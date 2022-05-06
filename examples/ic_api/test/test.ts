import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ic_api';

const ic_api_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
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
        name: 'deploy',
        prep: async () => {
            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'caller',
        test: async () => {
            const result = await ic_api_canister.caller();

            return {
                ok: result === '2vxsx-fae'
            };
        }
    },
    {
        name: 'canisterBalance',
        test: async () => {
            const result = await ic_api_canister.canisterBalance();

            return {
                ok: result === 4_000_000_000_000n
            };
        }
    },
    {
        name: 'id',
        test: async () => {
            const ic_api_canister_id = execSync(`dfx canister id ic_api`).toString().trim();

            const result = await ic_api_canister.id();

            return {
                ok: result.toText() === ic_api_canister_id
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
            const node_time_in_nanoseconds = BigInt(new Date().getTime()) * 1000000n;
            const canister_time = await ic_api_canister.time();

            const difference = canister_time - node_time_in_nanoseconds;
            const positive_difference = difference < 0 ? difference * -1n : difference;

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
                const result = await ic_api_canister.trap('here is the message');
    
                return {
                    ok: result
                };
            }
            catch(error) {
                return {
                    ok: (error as any).props.Message === 'IC0503: Canister rrkah-fqaaa-aaaaa-aaaaq-cai trapped explicitly: here is the message'
                };
            }
        }
    }
];

run_tests(tests);