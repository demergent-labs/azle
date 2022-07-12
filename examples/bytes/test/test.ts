// TODO we need to create the new deploy process since dfx deploy no longer works with .gz files

import { run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { createActor } from '../dfx_generated/azle';

const bytes_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    {
        name: 'clear canister memory',
        prep: async () => {
            execSync(`dfx canister uninstall-code bytes || true`, {
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
            execSync(`dfx deploy azle`, {
                stdio: 'inherit'
            });
        }
    },
    {
        name: 'get_bytes 1 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_1_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 1_000
            };
        }
    },
    {
        name: 'get_bytes 10 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_10_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 10_000
            };
        }
    },
    {
        name: 'get_bytes 100 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_100_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 100_000
            };
        }
    },
    {
        name: 'get_bytes 1000 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_1000_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 1_000_000
            };
        }
    },
    {
        name: 'get_bytes 2000 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_2000_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 2_000_000
            };
        }
    },
    {
        name: 'get_bytes 3000 kb',
        test: async () => {
            const file = Array.from(
                readFileSync('./test/example_files/example_3000_kb.txt')
            );

            const result = await bytes_canister.get_bytes(file);

            return {
                ok: result.length === 3_000_000
            };
        }
    }
];

run_tests(tests);
