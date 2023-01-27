import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE, TimerIds } from './dfx_generated/timers/timers.did';

let timer_ids: TimerIds = {
    single: 0n,
    inline: 0n,
    capture: 0n,
    repeat: 0n,
    single_cross_canister: 0n,
    repeat_cross_canister: 0n
};

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
                        result.repeat === 0 &&
                        result.single_cross_canister.length === 0 &&
                        result.repeat_cross_canister.length === 0
                };
            }
        },
        {
            name: 'set timers',
            test: async () => {
                timer_ids = await timers_canister.set_timers(10n, 5n);

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait for repeated timer to be called once',
            wait: 7_000
        },
        {
            name: 'check that only the repeated timers were called',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === false &&
                        result.inline === 0 &&
                        result.capture === '' &&
                        result.repeat === 1 &&
                        result.single_cross_canister.length === 0 &&
                        result.repeat_cross_canister.length === 32
                };
            }
        },
        {
            name: 'finish waiting for single timers to be called',
            wait: 5_000
        },
        {
            name: 'check that everything got called (and the repeated timers a second time)',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2 &&
                        result.single_cross_canister.length === 32 &&
                        result.repeat_cross_canister.length === 64
                };
            }
        },
        {
            name: 'cancel the repeated timers',
            test: async () => {
                if (timer_ids.repeat === undefined) {
                    return { err: 'repeated_timer_id was never stored' };
                }

                if (timer_ids.repeat_cross_canister === undefined) {
                    return { err: 'repeat_cross_canister_id was never stored' };
                }

                await Promise.all([
                    timers_canister.clear_timer(timer_ids.repeat),
                    timers_canister.clear_timer(timer_ids.repeat_cross_canister)
                ]);

                return {
                    ok: true
                };
            }
        },
        {
            name: 'wait the repeating call interval',
            wait: 7_000
        },
        {
            name: 'check that the repeating timers stopped',
            test: async () => {
                const result = await timers_canister.status_report();

                return {
                    ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2 &&
                        result.single_cross_canister.length === 32 &&
                        result.repeat_cross_canister.length === 64
                };
            }
        }
    ];

    return tests;
}
