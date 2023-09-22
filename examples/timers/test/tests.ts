import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE, rec_0 } from './dfx_generated/timers/timers.did';

let timerIds: rec_0 = {
    single: 0n,
    inline: 0n,
    capture: 0n,
    repeat: 0n,
    singleCrossCanister: 0n,
    repeatCrossCanister: 0n
};

export function getTests(timersCanister: ActorSubclass<_SERVICE>): Test[] {
    const tests: Test[] = [
        {
            name: 'get initial timer values',
            test: async () => {
                const result = await timersCanister.statusReport();

                return {
                    Ok:
                        result.single === false &&
                        result.inline === 0 &&
                        result.capture === '' &&
                        result.repeat === 0 &&
                        result.singleCrossCanister.length === 0 &&
                        result.repeatCrossCanister.length === 0
                };
            }
        },
        {
            name: 'set timers',
            test: async () => {
                timerIds = await timersCanister.setTimers(10n, 5n);

                return {
                    Ok: true
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
                const result = await timersCanister.statusReport();

                return {
                    Ok:
                        result.single === false &&
                        result.inline === 0 &&
                        result.capture === '' &&
                        result.repeat === 1 &&
                        result.singleCrossCanister.length === 0 &&
                        result.repeatCrossCanister.length === 32
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
                const result = await timersCanister.statusReport();

                return {
                    Ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2 &&
                        result.singleCrossCanister.length === 32 &&
                        result.repeatCrossCanister.length === 64
                };
            }
        },
        {
            name: 'cancel the repeated timers',
            test: async () => {
                if (timerIds.repeat === undefined) {
                    return { Err: 'repeatedTimerId was never stored' };
                }

                if (timerIds.repeatCrossCanister === undefined) {
                    return { Err: 'repeatCrossCanisterId was never stored' };
                }

                await Promise.all([
                    timersCanister.clearTimer(timerIds.repeat),
                    timersCanister.clearTimer(timerIds.repeatCrossCanister)
                ]);

                return {
                    Ok: true
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
                const result = await timersCanister.statusReport();

                return {
                    Ok:
                        result.single === true &&
                        result.inline === 1 &&
                        result.capture === '🚩' &&
                        result.repeat === 2 &&
                        result.singleCrossCanister.length === 32 &&
                        result.repeatCrossCanister.length === 64
                };
            }
        }
    ];

    return tests;
}
