import { describe } from '@jest/globals';
import { expect, it, please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';

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
                execSync(`npm install`, {
                    cwd: canister.projectRoot
                });
            });
        });

        describe.each(CANISTERS)('install experimental deps', (canister) => {
            // TODO: This seems like it would be the ideal way to temporarily install experimental deps. However it doesn't work yet.
            // TODO: https://github.com/demergent-labs/azle/issues/2958
            please(
                `install experimental deps for ${canister.name}`,
                async () => {
                    if (process.env.AZLE_EXPERIMENTAL === 'true') {
                        execSync(
                            `npm install https://github.com/demergent-labs/azle-experimental-deps#34cf2e34958e03cae7bf63f77f86ae682eef8a7c`,
                            {
                                cwd: canister.projectRoot
                            }
                        );
                    }
                }
            );
        });

        describe.each(CANISTERS)('Testing canister: $name', (canister) => {
            please(`deploy ${canister.name}`, async () => {
                execSync(`dfx deploy ${canister.name}`, {
                    cwd: canister.dfxRoot
                });
            });

            it(`should use the test-specific azle version in ${canister.name}`, async () => {
                const actualVersion = JSON.parse(
                    execSync(
                        `dfx canister call ${canister.name} ${canister.method} --output json`,
                        {
                            encoding: 'utf-8',
                            cwd: canister.dfxRoot
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

        describe.each(CANISTERS)(
            'Remove package-lock.json file and node_modules directory',
            (canister) => {
                please(
                    `remove package-lock.json and node_modules for ${canister.name}`,
                    async () => {
                        await clean(canister.projectRoot);

                        if (canister.workspaceRoot) {
                            await clean(canister.workspaceRoot);
                        }
                    }
                );
            }
        );
    };
}

/**
 * Cleans up package-lock.json and node_modules directory at a given directory.
 * @param dir The directory path to clean.
 */
async function clean(dir: string): Promise<void> {
    const packageLockPath = join(dir, 'package-lock.json');
    const nodeModulesPath = join(dir, 'node_modules');

    if (existsSync(packageLockPath)) {
        await rm(packageLockPath, {
            force: true
        });
    }

    if (existsSync(nodeModulesPath)) {
        await rm(nodeModulesPath, {
            recursive: true,
            force: true
        });
    }
}
