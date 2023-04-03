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
            name: 'heartbeat guard',
            test: async () => {
                const initialState = await guardFunctionsCanister.getState();
                console.log(
                    `Value at initial check was: ${initialState.heartbeatTick}`
                );
                await sleep(15_000);
                const stateAfterRest = await guardFunctionsCanister.getState();
                console.log(
                    `Value after 15s delay was: ${stateAfterRest.heartbeatTick}`
                );

                return {
                    Ok:
                        initialState.heartbeatTick < 20 &&
                        stateAfterRest.heartbeatTick === 20
                };
            }
        },
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
                const stateBefore = await guardFunctionsCanister.getState();
                const methodExecuted =
                    await guardFunctionsCanister.modifyStateGuarded();
                const stateAfter = await guardFunctionsCanister.getState();

                return {
                    Ok:
                        stateBefore.counter === 0 &&
                        methodExecuted &&
                        stateAfter.counter === 1
                };
            }
        },
        {
            name: 'unallowedMethod',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.unallowedMethod();
                    return {
                        Err: 'Expected unallowedMethod function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            'Code: 403 (Forbidden)'
                        )
                    };
                }
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
                            `"Message": "Execution halted by \\"unpassable\\" guard function"`
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
                            `Execution halted by \\"throw string\\" guard function`
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
                    // TODO: I actually expect this to say "Uncaught CustomError: Execution..."
                    // Why it only says "Error" not "CustomError" I don't understand.
                    return {
                        Ok: (error as AgentError).message.includes(
                            `Execution halted by \\"throw custom error\\" guard function`
                        )
                    };
                }
            }
        },
        {
            name: 'invalidReturnTypeGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.invalidReturnTypeGuarded();
                    return {
                        Err: 'Expected invalidReturnTypeGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `TypeError: value is not a GuardResult`
                        )
                    };
                }
            }
        },
        {
            name: 'badObjectGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.badObjectGuarded();
                    return {
                        Err: 'Expected badObjectGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `TypeError: value is not a GuardResult`
                        )
                    };
                }
            }
        },
        {
            name: 'nonNullOkValueGuarded',
            test: async () => {
                try {
                    const result =
                        await guardFunctionsCanister.nonNullOkValueGuarded();
                    return {
                        Err: 'Expected nonNullOkValueGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        Ok: (error as AgentError).message.includes(
                            `TypeError: value is not null`
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
                            `TypeError: value is not a string`
                        )
                    };
                }
            }
        },
        {
            name: 'preventUpgrades',
            test: async () => {
                try {
                    execSync('dfx deploy');
                    return { Err: "Guard function didn't prevent upgrades" };
                } catch (error) {
                    return { Ok: true };
                }
            }
        }
    ];
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
