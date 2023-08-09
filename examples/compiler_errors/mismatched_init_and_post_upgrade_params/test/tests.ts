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
                    execSync(`dfx deploy`, { stdio: 'pipe' });

                    return {
                        Err: 'Expected the deploy to fail but it succeeded'
                    };
                } catch (e: any) {
                    const stdErr = (e as ExecSyncError).stderr.toString();
                    const expectedError = `error: params for $init and $postUpgrade must be exactly the same`;

                    if (!stdErr.includes(expectedError)) {
                        return {
                            Err: unexpectedErrorMessage(expectedError, stdErr)
                        };
                    }

                    return { Ok: true };
                }
            }
        }
    ];
}

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
