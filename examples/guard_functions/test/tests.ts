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
                await sleep(8000);
                const stateAfterRest = await guardFunctionsCanister.getState();

                return {
                    ok:
                        initialState.heartbeatTick < 15 &&
                        stateAfterRest.heartbeatTick === 15
                };
            }
        },
        {
            name: 'identifierAnnotation',
            test: async () => {
                const result =
                    await guardFunctionsCanister.identifierAnnotation();

                return { ok: result };
            }
        },
        {
            name: 'callExpressionWithoutOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithoutOptionsObject();

                return { ok: result };
            }
        },
        {
            name: 'callExpressionWithEmptyOptionsObject',
            test: async () => {
                const result =
                    await guardFunctionsCanister.callExpressionWithEmptyOptionsObject();

                return { ok: result };
            }
        },
        {
            name: 'looselyGuarded',
            test: async () => {
                const result = await guardFunctionsCanister.looselyGuarded();

                return { ok: result };
            }
        },
        {
            name: 'looselyGuardedWithGuardOptionKeyAsString',
            test: async () => {
                const result =
                    await guardFunctionsCanister.looselyGuardedWithGuardOptionKeyAsString();

                return { ok: result };
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
                    ok:
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
                        err: 'Expected unallowedMethod function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
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
                        err: 'Expected tightlyGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `"Message": "Execution halted by \\"allowNone\\" guard function"`
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
                        err: 'Expected errorStringGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
                            `Uncaught Execution halted by \\"throwString\\" guard function`
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
                        err: 'Expected customErrorGuarded function to throw'
                    };
                } catch (error) {
                    // TODO: I actually expect this to say "Uncaught CustomError: Execution..."
                    // Why it only says "Error" not "CustomError" I don't understand.
                    return {
                        ok: (error as AgentError).message.includes(
                            `Uncaught Error: Execution halted by \\"throwCustomError\\" guard function`
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
                        err: 'Expected invalidReturnTypeGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
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
                        err: 'Expected badObjectGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
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
                        err: 'Expected nonNullOkValueGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
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
                        err: 'Expected nonStringErrValueGuarded function to throw'
                    };
                } catch (error) {
                    return {
                        ok: (error as AgentError).message.includes(
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
                    return { err: "Guard function didn't prevent upgrades" };
                } catch (error) {
                    return { ok: true };
                }
            }
        }
    ];
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
