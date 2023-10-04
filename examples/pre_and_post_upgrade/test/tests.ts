import { Test } from 'azle/test';
import { execSync } from 'child_process';
import { _SERVICE } from './dfx_generated/pre_and_post_upgrade/pre_and_post_upgrade.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    preAndPostUpgradeCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getEntries',
            test: async () => {
                const result = await preAndPostUpgradeCanister.getEntries();

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'setEntry',
            test: async () => {
                const result = await preAndPostUpgradeCanister.setEntry({
                    key: '0',
                    value: 0n
                });

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'getEntries',
            test: async () => {
                const result = await preAndPostUpgradeCanister.getEntries();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].key === '0' &&
                        result[0].value === 0n
                };
            }
        },
        {
            name: 'deploy',
            prep: async () => {
                execSync(`dfx deploy --upgrade-unchanged`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'getEntries',
            test: async () => {
                const result = await preAndPostUpgradeCanister.getEntries();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].key === '0' &&
                        result[0].value === 1n
                };
            }
        }
    ];
}
