const fs = require('fs');
const { execSync } = require('child_process');

runTests();

async function runTests() {
    const testJson = JSON.parse(fs.readFileSync('test/test.json').toString());

    for (let i = 0; i < testJson.tests.length; i++) {
        const test = testJson.tests[i];

        let result = '';

        try {
            if (test.skip === true) {
                continue;
            }

            if (test.bash !== undefined) {
                console.log(`Executing bash command`);

                execSync(
                    test.bash,
                    { stdio: 'inherit' }
                );

                continue;
            }

            console.log(`Running test ${test.canisterName} ${test.canisterMethod ? test.canisterMethod : ''}`);

            const deployCommand = getDeployCommand(
                test,
                i
            );

            if (deployCommand !== '') {
                execSync(
                    deployCommand,
                    { stdio: 'inherit' }
                );
            }

            if (
                test.delay !== '' &&
                test.delay !== undefined
            ) {
                console.log(`waiting ${test.delay} milliseconds`);
                await new Promise((resolve) => setTimeout(resolve, test.delay));
            }

            const canisterCommand = getCanisterCommand(test);

            if (canisterCommand !== '') {
                result = execSync(canisterCommand).toString();
            }
        }
        catch(error) {
            console.log('\x1b[31m', `test ${test.canisterName} ${test.canisterMethod ? test.canisterMethod : ''} failed`, error.toString());
            console.log('\x1b[0m');
            process.exit(1);
        }

        if (testResult(test, result) === true) {
            console.log('\x1b[32m', `test ${test.canisterName} ${test.canisterMethod ? test.canisterMethod : ''} passed`);
            console.log('\x1b[0m');
        }
        else {
            console.log('\x1b[31m', `test ${test.canisterName} ${test.canisterMethod ? test.canisterMethod : ''} failed`);
            console.log('\x1b[31m', `Expected: ${test.expectedOutput}, Received: ${result.trim()}`); // TODO we need to fix this to handle the bash equivalent now
            console.log('\x1b[0m');
            
            process.exit(1);
        }
    }
}

function getDeployCommand(
    test,
    index
) {
    if (
        index === 0 ||
        test.deploy === true
    ) {
        const deployArgument = getDeployArgument(test);
        
        return `dfx deploy${deployArgument}`;
    }
    else {
        return '';
    }
}

function getDeployArgument(test) {
    if (
        test.deployArgument === '' ||
        test.deployArgument === undefined
    ) {
        return '';
    }
    else {
        return ` --argument='${test.deployArgument}'`;
    }
}

function getCanisterCommand(test) {
    if (
        test.canisterMethod === '' ||
        test.canisterMethod === undefined
    ) {
        return '';
    }
    else {
        return `dfx canister call ${test.canisterName} ${test.canisterMethod} '${test.methodArgs}'`;
    }
}

function testResult(
    test,
    result
) {
    if (test.expectedOutputBash !== undefined) {
        const expectedOutputBash = execSync(test.expectedOutputBash).toString();

        return result.trim() === expectedOutputBash.trim();
    }

    if (
        test.expectedOutput === '' ||
        test.expectedOutput === undefined
    ) {
        return true;
    }

    return result.trim() === test.expectedOutput;
}