import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/pre_and_post_upgrade/pre_and_post_upgrade.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    pre_and_post_upgrade_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_entries',
            test: async () => {
                const result =
                    await pre_and_post_upgrade_canister.get_entries();

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'set_entry',
            test: async () => {
                const result = await pre_and_post_upgrade_canister.set_entry({
                    key: '0',
                    value: 0n
                });

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'get_entries',
            test: async () => {
                const result =
                    await pre_and_post_upgrade_canister.get_entries();

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
                execSync(`dfx deploy`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'get_entries',
            test: async () => {
                const result =
                    await pre_and_post_upgrade_canister.get_entries();

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
