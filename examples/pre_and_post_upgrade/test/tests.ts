import { ActorSubclass } from '@dfinity/agent';
import { expect, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/pre_and_post_upgrade/pre_and_post_upgrade.did';

export function getTests(
    preAndPostUpgradeCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('getEntries', async () => {
            const result = await preAndPostUpgradeCanister.getEntries();

            expect(result).toHaveLength(0);
        });

        it('setEntry', async () => {
            const result = await preAndPostUpgradeCanister.setEntry({
                key: '0',
                value: 0n
            });

            expect(result).toBeUndefined();
        });

        it('getEntries', async () => {
            const result = await preAndPostUpgradeCanister.getEntries();

            const expectedResult = [
                {
                    key: '0',
                    value: 0n
                }
            ];

            expect(result).toStrictEqual(expectedResult);
        });

        please('deploy', async () => {
            execSync(`dfx deploy --upgrade-unchanged`, {
                stdio: 'inherit'
            });
        });

        it('getEntries', async () => {
            const result = await preAndPostUpgradeCanister.getEntries();

            const expectedResult = [
                {
                    key: '0',
                    value: 1n
                }
            ];

            expect(result).toStrictEqual(expectedResult);
        });
    };
}
