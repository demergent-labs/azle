import { execSync } from 'child_process';
// @ts-expect-error We have no types from deep-is
import * as deepEqual from 'deep-is';

import { jsonStringify } from '../src/lib';

export type Test<Context = any> = {
    name: string;
    skip?: boolean;
    wait?: number;
    prep?: (context: Context) => Promise<Context | void>;
    test?: (context: Context) => Promise<AzleResult<boolean, string, Context>>;
};

// export type Variant<T> = Partial<T>;

export type AzleResult<T, E, Context = any> = Partial<{
    Ok: { passes: T; context?: Context };
    Err: E;
}>;

// type AzleTestContext = any; // TODO I think I want this to be object eventually

export type Ok<T, Context> = {
    Ok: { passes: T; context: Context };
};

// TODO let's get rid of this function in all tests and use match instead
export function ok<T, E, Context>(
    azle_result: AzleResult<T, E, Context>
): azle_result is Ok<T, Context> {
    if (azle_result.Err === undefined) {
        return true;
    } else {
        return false;
    }
}

// TODO should this just return a boolean?
// TODO then the function calling can decide to throw or not
export async function runTests(
    tests: Test[],
    exitProcess: boolean = true
): Promise<boolean> {
    let context = undefined;
    for (const test of tests) {
        try {
            if (test.skip === true) {
                console.info(`Skipping: ${test.name}`);

                continue;
            }

            console.info();

            if (test.prep !== undefined || test.wait !== undefined) {
                console.info(`\n${test.name}\n`);
            } else {
                console.info(`\nRunning test: ${test.name}\n`);
            }

            if (test.wait !== undefined) {
                console.info(`waiting ${test.wait} milliseconds`);
                await new Promise((resolve) => setTimeout(resolve, test.wait));
                console.info('done waiting');
                continue;
            }

            if (test.prep !== undefined) {
                context = (await test.prep(context)) ?? context;
                continue;
            }

            const result: AzleResult<boolean, string, any> =
                test.test !== undefined
                    ? await test.test(context)
                    : {
                          Err: 'test is not defined'
                      };

            if (!ok(result)) {
                console.info('\x1b[31m', `test: ${test.name} failed`);
                console.info('\x1b[31m', `${result.Err}`);
                console.info('\x1b[0m');

                if (exitProcess) {
                    process.exit(1);
                } else {
                    return false;
                }
            }

            if (result.Ok.context !== undefined) {
                context = result.Ok.context;
            }

            if (result.Ok.passes !== true) {
                console.info('\x1b[31m', `test: ${test.name} failed`);
                console.info('\x1b[0m');

                if (exitProcess) {
                    process.exit(1);
                } else {
                    return false;
                }
            }

            console.info('\x1b[32m', `test: ${test.name} passed`);
            console.info('\x1b[0m');
        } catch (error) {
            console.info(
                '\x1b[31m',
                `test ${test.name} failed`,
                (error as any).toString()
            );
            console.info('\x1b[0m');

            if (exitProcess) {
                process.exit(1);
            } else {
                return false;
            }
        }
    }

    return true;
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

type EqualsOptions<Context> = {
    errMessage?: string;
    equals?: (actual: any, expected: any) => boolean;
    toString?: (value: any) => string;
    context?: Context;
};

export function equals<Context>(
    actual: any,
    expected: any,
    options?: EqualsOptions<Context>
): AzleResult<boolean, string, Context> {
    const equals = options?.equals ?? deepEqual;
    const valueToString = options?.toString ?? jsonStringify;

    if (equals(actual, expected)) {
        return { Ok: { passes: true, context: options?.context } };
    } else {
        const errMessage =
            options?.errMessage ??
            `Expected: ${valueToString(expected)}, Received: ${valueToString(
                actual
            )}`;
        return {
            Err: errMessage
        };
    }
}

export function fail(): AzleResult<boolean, string> {
    return { Ok: { passes: false } };
}

export function failWithMessage(message: string): AzleResult<boolean, string> {
    return { Err: message };
}

export function createTestResult<Context>(
    equals: () => boolean,
    errMessage: string,
    context?: Context
): AzleResult<boolean, string, Context> {
    if (equals()) {
        return { Ok: { passes: true, context } };
    } else {
        return {
            Err: errMessage
        };
    }
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

function convertKeysToSnakeCase(obj: any): any {
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
        (newObj as any)[snakeCaseKey] = convertKeysToSnakeCase(obj[key]);
    }

    return newObj;
}

function camelToSnakeCase(str: string) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
