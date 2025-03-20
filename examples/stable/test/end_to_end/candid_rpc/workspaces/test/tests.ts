import { beforeAll, describe } from '@jest/globals';
import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { CANISTERS } from './canisters';

export function getTests(): Test {
    return () => {
        describe.each(CANISTERS)('Testing canister: $name', (canister) => {
            beforeAll(async () => {
                execSync(`cd ${canister.path} && dfx deploy ${canister.name}`);
            });

            it(`should successfully call getAzleVersion on ${canister.name}`, async () => {
                const result = JSON.parse(
                    execSync(
                        `cd ${canister.path} && dfx canister call ${canister.name} ${canister.method} --output json`,
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
