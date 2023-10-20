import fc from 'fast-check';
import { TestSample, createCanisterArb } from './arbitraries/canister_arb';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { runTests } from '../test';

export function runPropTests(testArb: fc.Arbitrary<TestSample>) {
    fc.assert(
        fc.asyncProperty(createCanisterArb(testArb), async (canister) => {
            writeFileSync('src/index.ts', canister.sourceCode);

            execSync(`dfx canister uninstall-code canister || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx deploy canister`, {
                stdio: 'inherit'
            });

            execSync(`dfx generate canister`, {
                stdio: 'inherit'
            });

            await runTests(canister.tests);

            return true;
        }),
        {
            numRuns: 1
        }
    );
}
