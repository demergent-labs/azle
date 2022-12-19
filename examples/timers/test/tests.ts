import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE, TimerIds } from './dfx_generated/timers/timers.did';

let timer_ids: TimerIds = { single: 0n, inline: 0n, capture: 0n, repeat: 0n };

export function get_tests(timers_canister: ActorSubclass<_SERVICE>): Test[] {
    const tests: Test[] = [
        {
            name: 'get initial timer values',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === false &&
                        result.inline === 0 &&
                        result.capture === '' &&
                        result.repeat === 0
                };
            }
        },
        {
            name: 'set timers',
            test: async () => {
                timer_ids = await timers_canister.set_timers(5n, 3n);

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait for repeated timer to be called once',
            wait: 3500
        },
        {
            name: 'check that only the repeated timer was called',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === false &&
                        result.inline === 0 &&
                        result.capture === '' &&
                        result.repeat === 1
                };
            }
        },
        {
            name: 'finish waiting for single timers to be called',
            wait: 3000
        },
        {
            name: 'check that everything got called (and the repeated one a second time)',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2
                };
            }
        },
        {
            name: 'cancel the repeated timer',
            test: async () => {
                if (timer_ids.repeat === undefined) {
                    return { err: 'repeated_timer_id was never stored' };
                }

                const result = await timers_canister.clear_timer(
                    timer_ids.repeat
                );

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait the repeating call interval',
            wait: 3000
        },
        {
            name: 'check that the repeating timer stopped',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2
                };
            }
        }
    ];

    return tests;
}
