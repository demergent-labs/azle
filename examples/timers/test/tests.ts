import { ActorSubclass } from '@dfinity/agent';
import { error, succeed, Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/timers/timers.did';

let timerIds = {
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
                const expected = {
                    single: false,
                    inline: 0,
                    capture: '',
                    repeat: 0,
                    singleCrossCanister: [],
                    repeatCrossCanister: []
                };

                return testEquality(result, expected);
            }
        },
        {
            name: 'set timers',
            test: async () => {
                timerIds = await timersCanister.setTimers(10n, 5n);

                return succeed();
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

                return testEquality(
                    [
                        result.single,
                        result.inline,
                        result.capture,
                        result.repeat,
                        result.singleCrossCanister.length,
                        result.repeatCrossCanister.length
                    ],
                    [false, 0, '', 1, 0, 32]
                );
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

                return testEquality(
                    [
                        result.single,
                        result.inline,
                        result.capture,
                        result.repeat,
                        result.singleCrossCanister.length,
                        result.repeatCrossCanister.length
                    ],
                    [true, 1, '🚩', 2, 32, 64]
                );
            }
        },
        {
            name: 'cancel the repeated timers',
            test: async () => {
                if (timerIds.repeat === undefined) {
                    return error('repeatedTimerId was never stored');
                }

                if (timerIds.repeatCrossCanister === undefined) {
                    return error('repeatCrossCanisterId was never stored');
                }

                await Promise.all([
                    timersCanister.clearTimer(timerIds.repeat),
                    timersCanister.clearTimer(timerIds.repeatCrossCanister)
                ]);

                return succeed();
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

                return testEquality(
                    [
                        result.single,
                        result.inline,
                        result.capture,
                        result.repeat,
                        result.singleCrossCanister.length,
                        result.repeatCrossCanister.length
                    ],
                    [true, 1, '🚩', 2, 32, 64]
                );
            }
        }
    ];

    return tests;
}
