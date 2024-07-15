import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as CYCLESCANISTERSERVICE } from './dfx_generated/cycles/cycles.did';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE as INTERMEDIARYCANISTERSERVICE } from './dfx_generated/intermediary/intermediary.did';

export function getTests(
    cyclesCanister: ActorSubclass<CYCLESCANISTERSERVICE>,
    intermediaryCanister: ActorSubclass<INTERMEDIARYCANISTERSERVICE>
): Test {
    return () => {
        it('gets the initial canister balance', async () => {
            const intermediaryCallResult =
                await intermediaryCanister.getCanisterBalance();
            const cyclesCallResult = await cyclesCanister.getCanisterBalance();

            const twoAndAHalfTrillion = 2_500_000_000_000n;
            const fourTrillion = 4_000_000_000_000n;

            expect(intermediaryCallResult).toBeGreaterThan(twoAndAHalfTrillion);
            expect(intermediaryCallResult).toBeLessThan(fourTrillion);
            expect(cyclesCallResult).toBeGreaterThan(twoAndAHalfTrillion);
            expect(cyclesCallResult).toBeLessThan(fourTrillion);
        });

        it('checks msgCyclesAvailable and msgCyclesAccept with 0 cycles sent', async () => {
            const result = await cyclesCanister.receiveCycles();

            expect(result).toBe(0n);
        });

        it('refunds cycles with msgCyclesRefunded', async () => {
            const refundResult = await intermediaryCanister.sendCycles();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult = await cyclesCanister.getCanisterBalance();

            expect(refundResult).toBe(500_000n);
            // expect(intermediaryCallResult).toBe(3_999_999_500_000n);
            // expect(cyclesCallResult).toBe(4_000_000_500_000n);
        });

        it('sends cycles with notify', async () => {
            const sendCyclesNotifyResult =
                await intermediaryCanister.sendCyclesNotify();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult =
            //     await cyclesCanister.getCanisterBalance();

            expect(sendCyclesNotifyResult).toBeUndefined();
            // expect(intermediaryCallResult).toBe(3_999_998_500_000n);
            // expect(cyclesCallResult).toBe(4_000_001_500_000n);
        });
    };
}
