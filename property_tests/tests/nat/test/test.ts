import fc from 'fast-check';
import { runTests } from 'azle/test';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createCanisterArb } from '../../../arbitraries/canister_arb';

fc.assert(
    fc.asyncProperty(createCanisterArb('nat'), async (canister) => {
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
