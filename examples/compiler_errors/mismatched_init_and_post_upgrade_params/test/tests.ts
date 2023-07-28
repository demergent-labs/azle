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

                    if (stdErr.includes(expectedError)) {
                        return { Ok: true };
                    } else {
                        return {
                            Err: unexpectedErrorMessage(expectedError, stdErr)
                        };
                    }
                }
            }
        }
    ];
}

const expectedError = `error: params for $init and $postUpgrade must be exactly the same
  --> ./src/index.ts:4:17
   |
 4 |   export function init(p1: boolean, p2: string, p3: int32): void {
   |                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ these params
...
 9 |   export function postUpgrade(p1: int32, p2: boolean): void {
   |                              ^^^^^^^^^^^^^^^^^^^^^^^^ and these params do not match
   |
help: update the params for either init or postUpgrade to match the other. E.g.:
   |
 4 |   export function init(p1: boolean, p2: string, p3: int32): void {
   |                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ copy these params
...
 9 |   export function postUpgrade(p1: boolean, p2: string, p3: int32): void {
   |                              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ to here
   |`;

function unexpectedErrorMessage(expectedError: string, stdErr: string) {
    return `>  The output from std err does not contain the expected error

Expected Error:

${expectedError}

ActualError:

${stdErr}`;
}
