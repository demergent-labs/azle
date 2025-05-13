import '#experimental/build/assert_experimental';

import { execSync } from 'child_process';
import fc from 'fast-check';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

import { defaultPropTestParams } from '../../../stable/test/property/default_prop_test_params';
import { Canister } from './arbitraries/canister_arb';
import { clear as clearUniquePrimitiveArb } from './arbitraries/unique_primitive_arb';
import { runTests } from './test';

export type Named<T> = {
    name: string;
    value: T;
};

export { getActor } from './get_actor';

export async function runPropTests(
    canisterArb: fc.Arbitrary<Canister>,
    runTestsSeparately = false
): Promise<void> {
    const executionParams = {
        ...defaultPropTestParams(),
        numRuns: runTestsSeparately
            ? 1
            : Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
    };
    // TODO https://github.com/demergent-labs/azle/issues/1568
    const numRuns = runTestsSeparately
        ? Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
        : 1;

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

                        // Escape arguments for bash
                        const escapedArgs =
                            args !== undefined
                                ? args.map((arg) => escapeSingleQuotes(arg))
                                : [];

                        const argumentsString =
                            args !== undefined && args.length > 0
                                ? `--argument '(${escapedArgs.join(', ')})'`
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

                        execSync(`tsc`, {
                            stdio: 'inherit'
                        });

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
                    ...errorLines.slice(0, 4),
                    ...errorLines.slice(errorLines.length - 3)
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

export const shortArrayConstraints = {
    minLength: 5,
    maxLength: 20
};

/**
 * Escapes a string for safe use in bash command line arguments enclosed in single quotes.
 * This properly handles special characters in the arguments.
 * @param input The input string to escape
 * @returns The escaped string
 */
function escapeSingleQuotes(input: string): string {
    // The bash way to escape a single quote inside a single-quoted string
    // is to close the single quote, insert an escaped single quote, and then reopen the single quote
    // We're handling just the top-level single quotes here since embedded text values
    // are already properly escaped by CliStringVisitor
    return input.replace(/'/g, "'\\''");
}
