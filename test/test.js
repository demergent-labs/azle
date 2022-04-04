const fs = require('fs');
const { execSync } = require('child_process');

runTests();

async function runTests() {
    const testJson = JSON.parse(fs.readFileSync('test/test.json').toString());

    for (const test of testJson.tests) {
        try {
            const result = execSync(`dfx canister call ${test.canisterName} ${test.canisterMethod} '${test.methodArgs}'`).toString();
    
            if (result.trim() === test.expectedOutput) {
                console.log('\x1b[32m', `test ${test.canisterName} ${test.canisterMethod} passed`);
                console.log('\x1b[0m');
            }
            else {
                console.log('\x1b[31m', `test ${test.canisterName} ${test.canisterMethod} failed`);
                console.log('\x1b[31m', `Expected: ${test.expectedOutput}, Received: ${result.trim()}`);
                console.log('\x1b[0m');
                
                process.exit(1);
            }
        }
        catch(error) {
            console.log('\x1b[31m', `test ${test.canisterName} ${test.canisterMethod} failed`, error.toString());
            console.log('\x1b[0m');
        }
    }
}