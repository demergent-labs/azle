import { ActorSubclass } from '@dfinity/agent';
import { AgentError } from '@dfinity/agent/lib/cjs/errors';
import { fail, Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/guard_functions/guard_functions.did';

export function getTests(
    guardFunctionsCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'identifierAnnotation',
            test: async () => {
                const result =
                    await guardFunctionsCanister.identifierAnnotation();

                return test(result);
            }
        },
        {
            name: 'callExpressionWithoutOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithoutOptionsObject();

                return test(result);
            }
        },
        {
            name: 'callExpressionWithEmptyOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithEmptyOptionsObject();

                return test(result);
            }
        },
        {
            name: 'looselyGuarded',
            test: async () => {
                const result = await guardFunctionsCanister.looselyGuarded();

                return test(result);
            }
        },
        {
            name: 'looselyGuardedManual',
            test: async () => {
                const result =
                    await guardFunctionsCanister.looselyGuardedManual();

                return test(result);
            }
        },
        {
            name: 'looselyGuardedWithGuardOptionKeyAsString',
            test: async () => {
                const result =
                    await guardFunctionsCanister.looselyGuardedWithGuardOptionKeyAsString();

                return test(result);
            }
        },
        {
            name: 'modifyStateGuarded',
            test: async () => {
                const counterBefore = await guardFunctionsCanister.getCounter();
                const methodExecuted =
                    await guardFunctionsCanister.modifyStateGuarded();
                const counterAfter = await guardFunctionsCanister.getCounter();

                return testEquality(
                    [counterBefore, methodExecuted, counterAfter],
                    [0, true, 1]
                );
            }
        },
        {
            name: 'tightlyGuarded',
            test: async () => {
                try {
                    await guardFunctionsCanister.tightlyGuarded();
                    return fail('Expected tightlyGuarded function to throw');
                } catch (error) {
                    return testEquality(
                        (error as AgentError).message,
                        `Uncaught Error: Execution halted by \\"unpassable\\" guard function`,
                        {
                            equals: (actual, expected) =>
                                actual.includes(expected)
                        }
                    );
                }
            }
        },
        {
            name: 'errorStringGuarded',
            test: async () => {
                try {
                    await guardFunctionsCanister.errorStringGuarded();
                    return fail(
                        'Expected errorStringGuarded function to throw'
                    );
                } catch (error) {
                    return testEquality(
                        (error as AgentError).message,
                        `Uncaught Error: Execution halted by \\"throw string\\" guard function`,
                        {
                            equals: (actual, expected) =>
                                actual.includes(expected)
                        }
                    );
                }
            }
        },
        {
            name: 'customErrorGuarded',
            test: async () => {
                try {
                    await guardFunctionsCanister.customErrorGuarded();
                    return fail(
                        'Expected customErrorGuarded function to throw'
                    );
                } catch (error) {
                    return testEquality(
                        (error as AgentError).message,
                        `Uncaught CustomError: Execution halted by \\"throw custom error\\" guard function`,
                        {
                            equals: (actual, expected) =>
                                actual.includes(expected)
                        }
                    );
                }
            }
        },
        {
            name: 'nonStringErrValueGuarded',
            test: async () => {
                try {
                    await guardFunctionsCanister.nonStringErrValueGuarded();
                    return fail(
                        'Expected nonStringErrValueGuarded function to throw'
                    );
                } catch (error) {
                    return testEquality(
                        (error as AgentError).message,
                        `Uncaught Error: [object Object]`,
                        {
                            equals: (actual, expected) =>
                                actual.includes(expected)
                        }
                    );
                }
            }
        }
    ];
}
