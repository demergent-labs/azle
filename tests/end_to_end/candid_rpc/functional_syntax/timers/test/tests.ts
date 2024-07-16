import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test, wait } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/timers/timers.did';

let timerIds = {
    single: 0n,
    inline: 0n,
    capture: 0n,
    repeat: 0n,
    singleCrossCanister: 0n,
    repeatCrossCanister: 0n
};

export function getTests(timersCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('get initial timer values', async () => {
            const result = await timersCanister.statusReport();

            const expectedResult = {
                single: false,
                inline: 0,
                capture: '',
                repeat: 0,
                singleCrossCanister: new Uint8Array([]),
                repeatCrossCanister: new Uint8Array([])
            };

            expect(result).toStrictEqual(expectedResult);
        });

        it('set timers', async () => {
            timerIds = await timersCanister.setTimers(10n, 5n);

            expect(true).toBe(true);
        });

        wait('for repeated timer to be called once', 7_000);

        it('check that only the repeated timers were called', async () => {
            const result = await timersCanister.statusReport();

            const expectedResult = {
                single: false,
                inline: 0,
                capture: '',
                repeat: 1
            };

            expect(result).toStrictEqual(
                expect.objectContaining(expectedResult)
            );
            expect(result.singleCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.singleCrossCanister).toHaveLength(0);
            expect(result.repeatCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.repeatCrossCanister).toHaveLength(32);
        });

        wait('finish waiting for single timers to be called', 5_000);

        it('check that everything got called (and the repeated timers a second time)', async () => {
            const result = await timersCanister.statusReport();

            const expectedResult = {
                single: true,
                inline: 1,
                capture: '🚩',
                repeat: 2
            };

            expect(result).toStrictEqual(
                expect.objectContaining(expectedResult)
            );
            expect(result.singleCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.singleCrossCanister).toHaveLength(32);
            expect(result.repeatCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.repeatCrossCanister).toHaveLength(64);
        });

        it('cancel the repeated timers', async () => {
            expect(timerIds.repeat).not.toBeUndefined();
            expect(timerIds.repeatCrossCanister).not.toBeUndefined();

            await Promise.all([
                timersCanister.clearTimer(timerIds.repeat),
                timersCanister.clearTimer(timerIds.repeatCrossCanister)
            ]);

            expect(true).toBe(true);
        });

        wait('the repeating call interval', 7_000);

        it('check that the repeating timers stopped', async () => {
            const result = await timersCanister.statusReport();

            const expectedResult = {
                single: true,
                inline: 1,
                capture: '🚩',
                repeat: 2
            };

            expect(result).toStrictEqual(
                expect.objectContaining(expectedResult)
            );
            expect(result.singleCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.singleCrossCanister).toHaveLength(32);
            expect(result.repeatCrossCanister).toBeInstanceOf(Uint8Array);
            expect(result.repeatCrossCanister).toHaveLength(64);
        });
    };
}
