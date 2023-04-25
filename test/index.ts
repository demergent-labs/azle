import { Variant } from '../src/lib';
import { execSync } from 'child_process';

export type Test = {
    name: string;
    skip?: boolean;
    wait?: number;
    prep?: () => Promise<any>;
    test?: () => Promise<AzleResult<boolean, string>>;
};

// export type Variant<T> = Partial<T>;

export type AzleResult<T, E> = Variant<{
    Ok: T;
    Err: E;
}>;

export type Ok<T> = {
    Ok: T;
};

// TODO let's get rid of this function in all tests and use match instead
export function ok<T, E>(azle_result: AzleResult<T, E>): azle_result is Ok<T> {
    if (azle_result.Err === undefined) {
        return true;
    } else {
        return false;
    }
}

// TODO should this just return a boolean?
// TODO then the function calling can decide to throw or not
export async function runTests(tests: Test[]) {
    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];

        try {
            if (test.skip === true) {
                console.log(`Skipping: ${test.name}`);

                continue;
            }

            console.log();

            if (test.prep !== undefined || test.wait !== undefined) {
                console.log(`\n${test.name}\n`);
            } else {
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

            const result =
                test.test !== undefined
                    ? await test.test()
                    : {
                          Err: 'test is not defined'
                      };

            if (!ok(result)) {
                console.log('\x1b[31m', `test: ${test.name} failed`);
                console.log('\x1b[31m', `${result.Err}`);
                console.log('\x1b[0m');

                process.exit(1);
            }

            if (result.Ok !== true) {
                console.log('\x1b[31m', `test: ${test.name} failed`);
                console.log('\x1b[0m');

                process.exit(1);
            }

            console.log('\x1b[32m', `test: ${test.name} passed`);
            console.log('\x1b[0m');
        } catch (error) {
            console.log(
                '\x1b[31m',
                `test ${test.name} failed`,
                (error as any).toString()
            );
            console.log('\x1b[0m');
            process.exit(1);
        }
    }
}

export function deploy(canisterName: string, argument?: string): Test[] {
    return [
        {
            // TODO hopefully we can get rid of this: https://forum.dfinity.org/t/generated-declarations-in-node-js-environment-break/12686/16?u=lastmjs
            name: 'waiting for createActor fetchRootKey',
            wait: 5000
        },
        {
            name: `create canister ${canisterName}`,
            prep: async () => {
                execSync(`dfx canister create ${canisterName}`, {
                    stdio: 'inherit'
                });
            }
        },
        {
            name: 'clear canister memory',
            prep: async () => {
                execSync(
                    `dfx canister uninstall-code ${canisterName} || true`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: `deploy canister ${canisterName}`,
            prep: async () => {
                execSync(
                    `dfx deploy${
                        argument === undefined ? '' : ` --argument ${argument}`
                    } ${canisterName}`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        }
    ];
}

export function createSnakeCaseProxy<T extends object>(
    target: T,
    async: boolean = true
): T {
    if (
        target === null ||
        (typeof target !== 'object' && typeof target !== 'function') ||
        target?.constructor?.name === 'Principal' ||
        target?.constructor?.name === 'BigInt' ||
        target?.constructor?.name === 'BigInt64Array' ||
        target?.constructor?.name === 'Int32Array' ||
        target?.constructor?.name === 'Int16Array' ||
        target?.constructor?.name === 'Int8Array' ||
        target?.constructor?.name === 'BigUint64Array' ||
        target?.constructor?.name === 'Uint32Array' ||
        target?.constructor?.name === 'Uint16Array' ||
        target?.constructor?.name === 'Uint8Array'
    ) {
        return target;
    }

    return new Proxy(target, {
        get(obj, prop) {
            const snakeCaseProp =
                (prop as string)[0] === (prop as string)[0]?.toUpperCase()
                    ? prop
                    : camelToSnakeCase(prop as string);

            if (typeof (obj as any)[snakeCaseProp] === 'function') {
                if (async) {
                    return async (...args: any[]) => {
                        const new_args = args.map((value) => {
                            return convertKeysToSnakeCase(value);
                        });
                        const result = await (obj as any)[snakeCaseProp](
                            ...new_args
                        );
                        return createSnakeCaseProxy(result, false);
                    };
                } else {
                    return (...args: any[]) => {
                        const new_args = args.map((value) => {
                            return convertKeysToSnakeCase(value);
                        });
                        const result = (obj as any)[snakeCaseProp](...new_args);
                        return createSnakeCaseProxy(result, false);
                    };
                }
            }

            if (typeof (obj as any)[snakeCaseProp] === 'object') {
                return createSnakeCaseProxy((obj as any)[snakeCaseProp], false);
            }

            return (obj as any)[snakeCaseProp];
        }
    }) as any;
}

function convertKeysToSnakeCase(obj) {
    if (
        typeof obj !== 'object' ||
        obj === null ||
        obj?.constructor?.name === 'Principal' ||
        obj?.constructor?.name === 'BigInt' ||
        obj?.constructor?.name === 'BigInt64Array' ||
        obj?.constructor?.name === 'Int32Array' ||
        obj?.constructor?.name === 'Int16Array' ||
        obj?.constructor?.name === 'Int8Array' ||
        obj?.constructor?.name === 'BigUint64Array' ||
        obj?.constructor?.name === 'Uint32Array' ||
        obj?.constructor?.name === 'Uint16Array' ||
        obj?.constructor?.name === 'Uint8Array'
    ) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map((element) => convertKeysToSnakeCase(element));
    }

    const newObj = {};
    for (const key in obj) {
        const snakeCaseKey =
            (key as string)[0] === (key as string)[0]?.toUpperCase()
                ? key
                : camelToSnakeCase(key as string);
        newObj[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
    }

    return newObj;
}

function camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function getCanisterId(canisterName: string): string {
    return execSync(`dfx canister id ${canisterName}`).toString().trim();
}
