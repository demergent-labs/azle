import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE } from './dfx_generated/pre_and_post_upgrade/pre_and_post_upgrade.did';

export function getTests(
    preAndPostUpgradeCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getEntries',
            test: async () => {
                const result = await preAndPostUpgradeCanister.getEntries();

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'setEntry',
            test: async () => {
                const result = await preAndPostUpgradeCanister.setEntry({
                    key: '0',
                    value: 0n
                });

                return testEquality(result, undefined);
            }
        },
        {
            name: 'getEntries',
            test: async () => {
                const result = await preAndPostUpgradeCanister.getEntries();
                const expected = { '0': 0n };

                return testEquality(result, [expected]);
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
                const expected = { '0': 1n };

                return testEquality(result, [expected]);
            }
        }
    ];
}
