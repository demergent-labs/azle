import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should return time from a query method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.constant(undefined), async () => {
                    const testTimeBefore = new Date().getTime() - 2_000;
                    const canisterTime0 = nanoSecondsToMilliseconds(
                        await actor.queryTime()
                    );
                    const canisterTime1 = nanoSecondsToMilliseconds(
                        await actor.queryTime()
                    );
                    const testTimeAfter = new Date().getTime();

                    expect(canisterTime0).toBeLessThanOrEqual(canisterTime1);

                    expect(canisterTime0).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );
                    expect(canisterTime1).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );

                    expect(canisterTime0).toBeLessThan(testTimeAfter);
                    expect(canisterTime1).toBeLessThanOrEqual(testTimeAfter);
                }),
                defaultPropTestParams
            );
        });

        it('should return time from an update method', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.constant(undefined), async () => {
                    const testTimeBefore = new Date().getTime() - 2_000;
                    const canisterTime0 = nanoSecondsToMilliseconds(
                        await actor.updateTime()
                    );
                    const canisterTime1 = nanoSecondsToMilliseconds(
                        await actor.updateTime()
                    );
                    const testTimeAfter = new Date().getTime();

                    expect(canisterTime0).toBeLessThan(canisterTime1);

                    expect(canisterTime0).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );
                    expect(canisterTime1).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );

                    expect(canisterTime0).toBeLessThan(testTimeAfter);
                    expect(canisterTime1).toBeLessThanOrEqual(testTimeAfter);
                }),
                defaultPropTestParams
            );
        });

        it('should return time from inspectMessage', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await fc.assert(
                fc.asyncProperty(fc.constant(undefined), async () => {
                    const testTimeBefore = new Date().getTime() - 2_000;

                    const inspectMessageTime0 = nanoSecondsToMilliseconds(
                        await getInspectMessageTime(actor)
                    );
                    const inspectMessageTime1 = nanoSecondsToMilliseconds(
                        await getInspectMessageTime(actor)
                    );

                    const testTimeAfter = new Date().getTime();

                    expect(inspectMessageTime0).toBeLessThanOrEqual(
                        inspectMessageTime1
                    );

                    expect(inspectMessageTime0).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );
                    expect(inspectMessageTime0).toBeLessThan(testTimeAfter);

                    expect(inspectMessageTime1).toBeGreaterThanOrEqual(
                        testTimeBefore
                    );
                    expect(inspectMessageTime1).toBeLessThanOrEqual(
                        testTimeAfter
                    );
                }),
                defaultPropTestParams
            );
        });
    };
}

function nanoSecondsToMilliseconds(nanoSeconds: bigint): bigint {
    return nanoSeconds / 1_000_000n;
}

async function getInspectMessageTime(actor: Actor): Promise<bigint> {
    try {
        await actor.inspectMessageTime();

        throw new Error(
            `inspectMessageTime should trap and this error should never be thrown`
        );
    } catch (error: any) {
        const errorMessage: string = error.message;

        const inspectMessageTime = Number(
            errorMessage.match(/.*with message: (\d+)/)?.[1]
        );

        return BigInt(inspectMessageTime);
    }
}
