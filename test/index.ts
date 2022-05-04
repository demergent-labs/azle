export type Test = {
    name: string;
    skip?: boolean;
    wait?: number;
    prep?: () => Promise<any>;
    test?: () => Promise<AzleResult<boolean>>;
};

export type Variant<T> = Partial<T>;

export type AzleResult<T> = Variant<{
    ok: T;
    err: string;
}>;

export type Ok<T> = {
    ok: T;
};

export function ok<T>(azle_result: AzleResult<T>): azle_result is Ok<T> {
    if (azle_result.err === undefined) {
        return true;
    }
    else {
        return false;
    }
}

// TODO should this just return a boolean?
// TODO then the function calling can decide to throw or not
export async function run_tests(tests: Test[]) {
    for (let i=0; i < tests.length; i++) {
        const test = tests[i];

        try {
            if (test.skip === true) {
                console.log(`Skipping: ${test.name}`);
                
                continue;
            }

            console.log();
    
            if (
                test.prep !== undefined ||
                test.wait !== undefined
            ) {
                console.log(`\n${test.name}\n`);
            }
            else {
                console.log(`\nRunning test: ${test.name}\n`);
            }

            if (test.wait !== undefined) {
                console.log(`waiting ${test.wait} milliseconds`);
                await new Promise((resolve) => setTimeout(resolve, test.wait));
                console.log('done waiting');
                continue;
            }

            if (test.prep !== undefined) {
                await test.prep();
                continue;
            }

            const result = test.test !== undefined ? await test.test() : {
                err: 'test is not defined'
            };

            if (!ok(result)) {
                console.log('\x1b[31m', `test: ${test.name} failed`);
                console.log('\x1b[31m', `${result.err}`);
                console.log('\x1b[0m');
                
                process.exit(1);
            }

            if (result.ok === false) {
                console.log('\x1b[31m', `test: ${test.name} failed`);
                console.log('\x1b[0m');
                
                process.exit(1);
            }

            console.log('\x1b[32m', `test: ${test.name} passed`);
            console.log('\x1b[0m');
        }
        catch(error) {
            console.log('\x1b[31m', `test ${test.name} failed`, (error as any).toString());
            console.log('\x1b[0m');
            process.exit(1);
        }
    }
}