import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/timers/timers.did';

let repeated_timer_id: bigint | undefined = undefined;

export function get_tests(timers_canister: ActorSubclass<_SERVICE>): Test[] {
    const tests: Test[] = [
        {
            name: 'get single timer initial value',
            test: async () => {
                const result = await timers_canister.single_use_timer_called();

                return {
                    ok: result === false
                };
            }
        },
        {
            name: 'get repeated timer initial value',
            test: async () => {
                const result =
                    await timers_canister.repeated_timer_call_count();

                return {
                    ok: result === 0
                };
            }
        },
        {
            name: 'start timers',
            test: async () => {
                const result = await timers_canister.start_timers(10n, 5n);

                repeated_timer_id = result[1];

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait for repeated timer to be called once',
            wait: 5000
        },
        {
            name: 'check that single timer was not called yet',
            test: async () => {
                const result = await timers_canister.single_use_timer_called();

                return {
                    ok: result === false
                };
            }
        },
        {
            name: 'check that repeated timer was called once',
            test: async () => {
                const result =
                    await timers_canister.repeated_timer_call_count();

                return {
                    ok: result === 1
                };
            }
        },
        {
            name: 'finish waiting for single timer to be called',
            wait: 5000
        },
        {
            name: 'check that single timer was called',
            test: async () => {
                const result = await timers_canister.single_use_timer_called();

                return {
                    ok: result === true
                };
            }
        },
        {
            name: 'check that repeated timer was called again',
            test: async () => {
                const result =
                    await timers_canister.repeated_timer_call_count();

                return {
                    ok: result === 2
                };
            }
        },
        {
            name: 'cancel the repeated timer',
            test: async () => {
                if (repeated_timer_id === undefined) {
                    return { err: 'repeated_timer_id was never stored' };
                }

                const result = await timers_canister.clear_timer(
                    repeated_timer_id
                );

                return {
                    ok: result === 2
                };
            }
        },
        {
            name: 'wait the repeating call interval',
            wait: 5000
        },
        {
            name: 'check that the repeating timer stopped',
            test: async () => {
                const result =
                    await timers_canister.repeated_timer_call_count();

                return {
                    ok: result === 2
                };
            }
        }
    ];

    return tests;
}
