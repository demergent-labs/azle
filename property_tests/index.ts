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
    value: T;
};

export { getActor } from './get_actor';

export async function runPropTests(
    canisterArb: fc.Arbitrary<Canister>,
    runTestsSeparately = false
) {
    const defaultParams = {
        numRuns: runTestsSeparately
            ? 1
            : Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1),
        endOnFailure: true // TODO This essentially disables shrinking. We don't know how to do shrinking well yet
    };
    // TODO https://github.com/demergent-labs/azle/issues/1568
    const numRuns = runTestsSeparately
        ? Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
        : 1;

    const seed = process.env.AZLE_PROPTEST_SEED
        ? Number(process.env.AZLE_PROPTEST_SEED)
        : undefined;

    const executionParams = seed ? { ...defaultParams, seed } : defaultParams;

    try {
        for (let i = 0; i < numRuns; i++) {
            await fc.assert(
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
                        const args =
                            i === 0
                                ? canister.initArgs
                                : canister.postUpgradeArgs;
                        const argumentsString =
                            args !== undefined && args.length > 0
                                ? `--argument '(${args.join(', ')})'`
                                : '';

                        execSync(
                            `dfx deploy canister ${argumentsString} --upgrade-unchanged`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        execSync(`dfx generate canister`, {
                            stdio: 'inherit'
                        });

                        const tests = canister.tests[i];

                        const result = await runTests(
                            tests,
                            process.env.AZLE_PROPTEST_QUIET === 'true'
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
                executionParams
            );
        }
    } catch (error) {
        if (process.env.AZLE_PROPTEST_VERBOSE !== 'true') {
            // Customize the error message to exclude counter example
            if (error instanceof Error) {
                const errorLines = error.message.split('\n');
                const newError = [
                    ...errorLines.slice(0, 2),
                    ...errorLines.slice(errorLines.length - 4)
                ].join('\n');
                error.message = newError;
            }
        }
        throw error;
    }
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
