import fc from 'fast-check';
import { TestSample, createCanisterArb } from './arbitraries/canister_arb';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { runTests } from '../test';

export function runPropTests(testArb: fc.Arbitrary<TestSample>) {
    fc.assert(
        fc.asyncProperty(createCanisterArb(testArb), async (canister) => {
            if (!existsSync('src')) {
                mkdirSync('src');
            }

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

            return await runTests(
                canister.tests,
                process.env.AZLE_PROPTEST_VERBOSE !== undefined
            );
        }),
        {
            numRuns: Number(process.env.AZLE_NUM_PROPTEST_RUNS ?? 1),
            endOnFailure: true // TODO This essentially disables shrinking. We don't know how to do shrinking well yet
        }
    );
}
