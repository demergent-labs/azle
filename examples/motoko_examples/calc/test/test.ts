import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/calc';

const calc_canister = createActor(
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
            execSync(`dfx canister uninstall-code calc || true`, {
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
        name: 'add 5',
        test: async () => {
            const result = await calc_canister.add(5n);

            return {
                ok: result === 5n
            };
        }
    },
    {
        name: 'sub 2',
        test: async () => {
            const result = await calc_canister.sub(2n);

            return {
                ok: result === 3n
            };
        }
    },
    {
        name: 'mul 6',
        test: async () => {
            const result = await calc_canister.mul(6n);

            return {
                ok: result === 18n
            };
        }
    },
    {
        name: 'div 2',
        test: async () => {
            const result = await calc_canister.div(2n);

            return {
                ok: (
                    result.length === 1 &&
                    result[0] === 9n
                )
            };
        }
    },
    {
        name: 'clearall',
        test: async () => {
            const result = await calc_canister.clearall();

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'add 0',
        test: async () => {
            const result = await calc_canister.add(0n);

            return {
                ok: result === 0n
            };
        }
    }
];

run_tests(tests);