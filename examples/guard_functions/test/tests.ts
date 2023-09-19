import { execSync } from 'child_process';
import { ActorSubclass } from '@dfinity/agent';
import { AgentError } from '@dfinity/agent/lib/cjs/errors';
import { Test } from 'azle/test';
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

                return { Ok: result };
            }
        },
        {
            name: 'callExpressionWithoutOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithoutOptionsObject();

                return { Ok: result };
            }
        },
        {
            name: 'callExpressionWithEmptyOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithEmptyOptionsObject();

                return { Ok: result };
            }
        },
        {
            name: 'looselyGuarded',
            test: async () => {
                const result = await guardFunctionsCanister.looselyGuarded();

                return { Ok: result };
            }
        },
        {
            name: 'looselyGuardedManual',
            test: async () => {
                const result =
                    await guardFunctionsCanister.looselyGuardedManual();

                return { Ok: result };
            }
        },
        {
            name: 'looselyGuardedWithGuardOptionKeyAsString',
            test: async () => {
                const result =
                    await guardFunctionsCanister.looselyGuardedWithGuardOptionKeyAsString();

                return { Ok: result };
            }
        },
        {
            name: 'modifyStateGuarded',
            test: async () => {
                const counterBefore = await guardFunctionsCanister.getCounter();
                const methodExecuted =
                    await guardFunctionsCanister.modifyStateGuarded();
                const counterAfter = await guardFunctionsCanister.getCounter();

                return {
                    Ok:
                        counterBefore === 0 &&
                        methodExecuted &&
                        counterAfter === 1
                };
            }
        },
        {
            name: 'tightlyGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.tightlyGuarded();
                    return {
                        Err: 'Expected tightlyGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `"Message": "Uncaught Execution halted by \\"unpassable\\" guard function"`
                        )
                    };
                }
            }
        },
        {
            name: 'errorStringGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.errorStringGuarded();
                    return {
                        Err: 'Expected errorStringGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `Uncaught Execution halted by \\"throw string\\" guard function`
                        )
                    };
                }
            }
        },
        {
            name: 'customErrorGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.customErrorGuarded();
                    return {
                        Err: 'Expected customErrorGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `Uncaught CustomError: Execution halted by \\"throw custom error\\" guard function`
                        )
                    };
                }
            }
        },
        {
            name: 'nonStringErrValueGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.nonStringErrValueGuarded();
                    return {
                        Err: 'Expected nonStringErrValueGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `Uncaught [object Object]`
                        )
                    };
                }
            }
        }
    ];
}
