import { execSync } from 'child_process';

export type Test = {
    skip?: boolean;
    delay?: number;
    bash?: string; // TODO perhaps we can just get rid of this
    expectedOutputBash?: string; // TODO perhaps we can just get rid of this
    prep?: () => Promise<any>;
    test?: (result: string) => Promise<boolean>;
};

// TODO should this just return a boolean?
// TODO then the function calling can decide to throw or not
export async function run_tests(tests: Test[]) {
    let test_number = 0;

    for (let i=0; i < tests.length; i++) {
        const test = tests[i];

        try {
            if (test.skip === true) {
                continue;
            }
    
            if (test.expectedOutputBash !== undefined) {
                console.log(`\nRunning test ${test_number}\n`);
            }

            if (test.delay !== undefined) {
                console.log(`waiting ${test.delay} milliseconds`);
                await new Promise((resolve) => setTimeout(resolve, test.delay));
            }
        
            if (test.bash !== undefined) {
                console.log(`${test.bash}\n`);
            }

            const result = test.bash !== undefined ? execSync(
                test.bash,
                {
                    stdio: test.expectedOutputBash === undefined && test.test === undefined ? 'inherit' : undefined
                }
            ) : test.prep !== undefined ? await test.prep() : 'NO_RESULT';
    
            if (
                test.expectedOutputBash === undefined &&
                test.test === undefined
            ) {
                continue;
            }

            const {
                correct,
                expected_output
            } = await perform_check(
                test,
                result.toString().trim()
            );

            if (correct === true) {
                console.log('\x1b[32m', `test ${test_number} passed`);
                console.log('\x1b[0m');
            }
            else {
                console.log('\x1b[31m', `test ${test_number} failed`);
                console.log('\x1b[31m', `Received: ${result.toString().trim()}, Expected: ${expected_output}`);
                console.log('\x1b[0m');
                
                process.exit(1);
            }

            test_number += 1;
        }
        catch(error) {
            console.log('\x1b[31m', `test ${i} failed`, (error as any).toString());
            console.log('\x1b[0m');
            process.exit(1);
        }
    }
}

async function perform_check(
    test: Test,
    result: string
): Promise<{
    correct: boolean;
    expected_output: string;
}> {
    if (test.expectedOutputBash !== undefined) {
        const expected_output = execSync(test.expectedOutputBash).toString().trim();

        return {
            correct: expected_output === result,
            expected_output
        };
    }

    if (test.test !== undefined) {
        return {
            correct: await test.test(result),
            expected_output: 'N/A'
        };
    }

    throw new Error('This should never happen');
}