import {
    run_tests,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/ic_api';

const ic_api_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
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
    }
];

run_tests(tests);