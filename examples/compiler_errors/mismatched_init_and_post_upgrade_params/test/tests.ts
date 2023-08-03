import { execSync } from 'child_process';
import { Test } from 'azle/test';

interface ExecSyncError extends Error {
    status: number;
    signal: string;
    output: Buffer[];
    pid: number;
    stdout: Buffer;
    stderr: Buffer;
}

export function getTests(): Test[] {
    return [
        {
            name: 'Using mismatched params in $init and $postUpgrade causes a compilation-time error',
            test: async () => {
                try {
                    execSync(`npx azle canister`, { stdio: 'pipe' });

                    return {
                        Err: 'Expected the build to fail but it succeeded'
                    };
                } catch (e: any) {
                    let stdErr = (e as ExecSyncError).stderr.toString();

                    if (!stdErr.includes(expectedErrorTitle)) {
                        return {
                            Err: unexpectedErrorMessage(
                                expectedErrorTitle,
                                stdErr
                            )
                        };
                    }

                    if (!expectedErrorKeywords.test(stdErr)) {
                        return {
                            Err: unexpectedErrorMessage(
                                expectedErrorKeywords,
                                stdErr
                            )
                        };
                    }

                    return { Ok: true };
                }
            }
        }
    ];
}

const expectedErrorTitle = `error: params for $init and $postUpgrade must be exactly the same`;

const expectedErrorKeywords = /these params.*and these params do not match/s;

function unexpectedErrorMessage(
    expectedError: string | RegExp,
    stdErr: string
) {
    return `>  The output from std err does not contain the expected error

Expected Error:

${expectedError}

ActualError:

${stdErr}`;
}
