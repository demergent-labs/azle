import { describe } from '@jest/globals';
import { please, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

export function getTests(): Test {
    return () => {
        describe.each([
            { name: 'initial' },
            { name: 'after upgrade-unchanged' },
            { name: 'after reinstall' }
        ])('round $name', (roundName) => {
            if (roundName.name === 'after upgrade-unchanged') {
                please('deploy with --upgrade-unchanged', async () => {
                    execSync('dfx deploy canister --upgrade-unchanged');
                });
            }

            if (roundName.name === 'after reinstall') {
                please('reinstall canister', async () => {
                    execSync('dfx canister uninstall-code canister');
                    execSync('dfx deploy canister');
                });
            }

            // Tests were removed as per the issue instructions
        });
    };
}
