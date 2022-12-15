import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE, TimerIds } from './dfx_generated/timers/timers.did';

let timer_ids: TimerIds = { single: 0n, inline1: 0n, inline2: 0n };

export function get_tests(timers_canister: ActorSubclass<_SERVICE>): Test[] {
    const tests: Test[] = [
        {
            name: 'get initial timer values',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === false &&
                        result.inline1 === 0 &&
                        result.inline2 === 0
                };
            }
        },
        {
            name: 'set timers',
            test: async () => {
                timer_ids = await timers_canister.set_timers(10n);

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait for half the delay of the single use timer',
            // name: 'wait for repeated timer to be called once',
            wait: 5000
        },
        {
            name: 'check that single timers were not called yet',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === false &&
                        result.inline1 === 0 &&
                        result.inline2 === 0
                };
            }
        },
        // {
        //     name: 'check that repeated timer was called once',
        //     test: async () => {
        //         const result =
        //             await timers_canister.repeated_timer_call_count();

        //         return {
        //             ok: result === 1
        //         };
        //     }
        // },
        {
            name: 'finish waiting for single timers to be called',
            wait: 5000
        },
        {
            name: 'check that single timers were called',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === true &&
                        result.inline1 === 1 &&
                        result.inline2 === 2
                };
            }
        }
        // {
        //     name: 'check that repeated timer was called again',
        //     test: async () => {
        //         const result =
        //             await timers_canister.repeated_timer_call_count();

        //         return {
        //             ok: result === 2
        //         };
        //     }
        // },
        // {
        //     name: 'cancel the repeated timer',
        //     test: async () => {
        //         if (repeated_timer_id === undefined) {
        //             return { err: 'repeated_timer_id was never stored' };
        //         }

        //         const result = await timers_canister.clear_timer(
        //             repeated_timer_id
        //         );

        //         return {
        //             ok: result === 2
        //         };
        //     }
        // },
        // {
        //     name: 'wait the repeating call interval',
        //     wait: 5000
        // },
        // {
        //     name: 'check that the repeating timer stopped',
        //     test: async () => {
        //         const result =
        //             await timers_canister.repeated_timer_call_count();

        //         return {
        //             ok: result === 2
        //         };
        //     }
        // }
    ];

    return tests;
}
