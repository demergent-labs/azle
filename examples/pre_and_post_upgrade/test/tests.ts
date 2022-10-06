import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/pre_and_post_upgrade/pre_and_post_upgrade.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    pre_and_post_upgrade_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
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
}
