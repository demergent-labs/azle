import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';
import { readdir, readFile } from 'fs/promises';

import { CANISTERS } from './canisters';

export function getTests(): Test {
    return () => {
        describe.each(CANISTERS)('Testing canister: $name', (canister) => {
            please(`npm install for ${canister.name}`, async () => {
                const files = await readdir(canister.packageJsonDir);
                expect(files).toContain('package.json');
                const packageJson = JSON.parse(
                    await readFile(
                        `${canister.packageJsonDir}/package.json`,
                        'utf-8'
                    )
                );
                execSync(`cd ${canister.expectedBin} && npm install`);
                const is_release =
                    process.env.AZLE_IS_MAIN_BRANCH_PUSH_FROM_RELEASE_MERGE ===
                        'true' ||
                    process.env.AZLE_IS_RELEASE_BRANCH_PR === 'true';
                const is_azle_latest =
                    packageJson.dependencies.azle === 'latest';

                const should_link =
                    is_release !== true && is_azle_latest === true;
                if (should_link) {
                    execSync(`cd ${canister.expectedBin} && npm link azle`);
                }
            });

            please('reinstall dfx extension', () => {
                execSync(
                    'cd ../../../../../../src/stable/build/dfx_extension && ./install.sh'
                );
            });

            please(`deploy ${canister.name}`, async () => {
                execSync(
                    `cd ${canister.dfxDir} && dfx deploy ${canister.name}`
                );
            });

            // TODO: See if we can figure this out after we have this fix in the installed versions of azle and don't have to link anymore
            // TODO: Or come up with a more robust way to test this
            it.skip('uses the right version of azle', () => {
                const execLocation = execSync(
                    `npm --prefix=${canister.packageJsonDir} exec /usr/bin/which azle`,
                    {
                        encoding: 'utf-8'
                    }
                );
                expect(execLocation).toContain(
                    `${canister.expectedBin}/node_modules/.bin/azle`
                );
            });

            it(`should successfully call getAzleVersion on ${canister.name}`, async () => {
                const result = JSON.parse(
                    execSync(
                        `cd ${canister.dfxDir} && dfx canister call ${canister.name} ${canister.method} --output json`,
                        {
                            encoding: 'utf-8'
                        }
                    )
                );

                expect(result).toBe(canister.result);
            });
        });
    };
}
