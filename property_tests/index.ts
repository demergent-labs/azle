import fc from 'fast-check';
// @ts-ignore
import libraryDeepEqual from 'deep-is';

import { Canister } from './arbitraries/canister_arb';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { runTests } from '../test';
import { clear as clearUniquePrimitiveArb } from './arbitraries/unique_primitive_arb';

export type Named<T> = {
    name: string;
    el: T;
};

export { getActor } from './get_actor';

export function runPropTests(canisterArb: fc.Arbitrary<Canister>) {
    fc.assert(
        fc.asyncProperty(canisterArb, async (canister) => {
            if (!existsSync('src')) {
                mkdirSync('src');
            }

            writeFileSync('src/index.ts', canister.sourceCode);

            execSync(`npx prettier --write src`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code canister || true`, {
                stdio: 'inherit'
            });

            for (let i = 0; i < canister.tests.length; i++) {
                execSync(`dfx deploy canister`, {
                    stdio: 'inherit'
                });

                execSync(`dfx generate canister`, {
                    stdio: 'inherit'
                });

                const tests = canister.tests[i];

                const result = await runTests(
                    tests,
                    process.env.AZLE_PROPTEST_VERBOSE !== 'true'
                );

                execSync(
                    `node_modules/.bin/tsc --noEmit --skipLibCheck --target es2020 --strict --moduleResolution node --allowJs`,
                    {
                        stdio: 'inherit'
                    }
                );

                clearUniquePrimitiveArb();

                if (result === false) {
                    return false;
                }
            }

            return true;
        }),
        {
            numRuns: Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1),
            endOnFailure: true // TODO This essentially disables shrinking. We don't know how to do shrinking well yet
        }
    );
}

export const defaultArrayConstraints = {
    minLength: 20,
    maxLength: 100
};

export function deepEqual(a: any, b: any): boolean {
    const result = libraryDeepEqual(a, b);

    if (result === false) {
        console.log('deepEqual returned false');
        console.log('deepEqual value a', a);
        console.log('deepEqual value b', b);
    }

    return result;
}
