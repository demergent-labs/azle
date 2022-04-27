import { execSync } from 'child_process';

export type Test = {
    skip?: boolean;
    bash: string;
    expectedOutputBash?: string;
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
        
            console.log(`${test.bash}\n`);

            const result = execSync(
                test.bash,
                {
                    stdio: test.expectedOutputBash === undefined ? 'inherit' : undefined
                }
            );
    
            if (test.expectedOutputBash === undefined) {
                continue;
            }
    
            const expected_output = execSync(test.expectedOutputBash).toString().trim();
        
            if (result.toString().trim() === expected_output) {
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