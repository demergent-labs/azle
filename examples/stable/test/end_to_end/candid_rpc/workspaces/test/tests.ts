import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { CANISTERS } from './canisters';
import { cleanTestPackages, prepareTestPackage } from './prepare_test_package';

const TEST_VERSION = '999.999.999';

export function getTests(): Test {
    return () => {
        describe.each(CANISTERS)('Building test packages', (canister) => {
            const version = `${TEST_VERSION}-${canister.packageSuffix}`;

            please(
                `prepare test-specific azle package for ${canister.name}`,
                async () => {
                    await prepareTestPackage(version);
                }
            );
        });

        // Npm install as a separate step so that all possible versions of azle are installed before deploying.
        // This ensures we have multiple versions of azle in the environment (including potentially wrong ones),
        // which makes the test meaningful. If only one version of azle is available, we're not actually testing
        // whether the correct version selection mechanism works properly - we'd just be using the only available version.
        describe.each(CANISTERS)('Npm install', (canister) => {
            please(`npm install for ${canister.name}`, async () => {
                execSync(`cd ${canister.nodeModulesLocation} && npm install`);
            });
        });

        describe.each(CANISTERS)('Testing canister: $name', (canister) => {
            please(`deploy ${canister.name}`, async () => {
                execSync(
                    `cd ${canister.dfxDir} && dfx deploy ${canister.name}`
                );
            });

            it(`should use the test-specific azle version in ${canister.name}`, async () => {
                const actualVersion = JSON.parse(
                    execSync(
                        `cd ${canister.dfxDir} && dfx canister call ${canister.name} ${canister.method} --output json`,
                        {
                            encoding: 'utf-8'
                        }
                    )
                );

                const expectedVersion = `${TEST_VERSION}-${canister.packageSuffix}`;
                expect(actualVersion).toBe(expectedVersion);
            });
        });

        please('clean test packages', () => {
            cleanTestPackages();
        });
    };
}
