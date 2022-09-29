import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/pre_and_post_upgrade';

const pre_and_post_upgrade_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...deploy('pre_and_post_upgrade'),
    {
        name: 'getEntries',
        test: async () => {
            const result = await pre_and_post_upgrade_canister.getEntries();

            return {
                ok: result.length === 0
            };
        }
    },
    {
        name: 'setEntry',
        test: async () => {
            const result = await pre_and_post_upgrade_canister.setEntry({
                key: '0',
                value: 0n
            });

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'getEntries',
        test: async () => {
            const result = await pre_and_post_upgrade_canister.getEntries();

            return {
                ok:
                    result.length === 1 &&
                    result[0].key === '0' &&
                    result[0].value === 0n
            };
        }
    },
    // {
    //     // TODO Get rid of this once https://forum.dfinity.org/t/upgrade-a-canister-even-if-the-wasm-module-hash-has-not-changed/11989
    //     name: 'function hack to allow a redeploy',
    //     prep: async () => {
    //         execSync(
    //             `echo "\\n\\nexport function hack(): Query<void> {}" >> src/pre_and_post_upgrade.ts`,
    //             {
    //                 stdio: 'inherit'
    //             }
    //         );
    //     }
    // },
    {
        name: 'deploy',
        prep: async () => {
            execSync(
                `dfx canister install --mode upgrade --upgrade-unchanged --wasm target/wasm32-unknown-unknown/release/pre_and_post_upgrade.wasm.gz pre_and_post_upgrade`,
                {
                    stdio: 'inherit'
                }
            );
        }
    },
    {
        name: 'getEntries',
        test: async () => {
            const result = await pre_and_post_upgrade_canister.getEntries();

            return {
                ok:
                    result.length === 1 &&
                    result[0].key === '0' &&
                    result[0].value === 0n
            };
        }
    }
];

run_tests(tests);
