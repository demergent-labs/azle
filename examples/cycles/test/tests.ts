import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import { _SERVICE as CYCLESCANISTERSERVICE } from './dfx_generated/cycles/cycles.did';
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

            const intermediaryCanister128Result =
                await intermediaryCanister.getCanisterBalance128();
            const cyclesCanister128Result =
                await cyclesCanister.getCanisterBalance128();

            const twoAndAHalfTrillion = 2_500_000_000_000n;
            const fourTrillion = 4_000_000_000_000n;

            expect(intermediaryCallResult).toBeGreaterThan(twoAndAHalfTrillion);
            expect(intermediaryCallResult).toBeLessThan(fourTrillion);
            expect(cyclesCallResult).toBeGreaterThan(twoAndAHalfTrillion);
            expect(cyclesCallResult).toBeLessThan(fourTrillion);
            expect(intermediaryCanister128Result).toBeGreaterThan(
                twoAndAHalfTrillion
            );
            expect(intermediaryCanister128Result).toBeLessThan(fourTrillion);
            expect(cyclesCanister128Result).toBeGreaterThan(
                twoAndAHalfTrillion
            );
            expect(cyclesCanister128Result).toBeLessThan(fourTrillion);
        });

        it('checks msgCyclesAvailable and msgCyclesAccept with 0 cycles sent', async () => {
            const result = await cyclesCanister.receiveCycles();

            expect(result).toBe(0n);
        });

        it('checks msgCyclesAvailable128 and msgCyclesAccept128 with 0 cycles sent', async () => {
            const result = await cyclesCanister.receiveCycles128();

            expect(result).toBe(0n);
        });

        it('refunds cycles with msgCyclesRefunded', async () => {
            const refundResult = await intermediaryCanister.sendCycles();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult = await cyclesCanister.getCanisterBalance();

            // const intermediaryCanister128Result =
            //     await intermediaryCanister.getCanisterBalance128();
            // const cyclesCanister128Result =
            //     await cyclesCanister.getCanisterBalance128();

            expect(refundResult).toBe(500_000n);
            // expect(intermediaryCallResult).toBe(3_999_999_500_000n);
            // expect(cyclesCallResult).toBe(4_000_000_500_000n);
            // expect(intermediaryCanister128Result).toBe(3_999_999_500_000n);
            // expect(cyclesCanister128Result).toBe(4_000_000_500_000n);
        });

        it('refunds cycles with msgCyclesRefunded128', async () => {
            const refundResult = await intermediaryCanister.sendCycles128();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult =
            //     await cyclesCanister.getCanisterBalance();

            // const intermediaryCanister128Result =
            //     await intermediaryCanister.getCanisterBalance128();
            // const cyclesCanister128Result =
            //     await cyclesCanister.getCanisterBalance128();

            expect(refundResult).toBe(500_000n);
            // expect(intermediaryCallResult).toBe(3_999_999_000_000n);
            // expect(cyclesCallResult).toBe(4_000_001_000_000n);
            // expect(intermediaryCanister128Result).toBe(3_999_999_000_000n);
            // expect(cyclesCanister128Result).toBe(4_000_001_000_000n);
        });

        it('sends cycles with notify', async () => {
            const sendCyclesNotifyResult =
                await intermediaryCanister.sendCyclesNotify();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult =
            //     await cyclesCanister.getCanisterBalance();

            // const intermediaryCanister128Result =
            //     await intermediaryCanister.getCanisterBalance128();
            // const cyclesCanister128Result =
            //     await cyclesCanister.getCanisterBalance128();

            expect(sendCyclesNotifyResult).toBeUndefined();
            // expect(intermediaryCallResult).toBe(3_999_998_500_000n);
            // expect(cyclesCallResult).toBe(4_000_001_500_000n);
            // expect(intermediaryCanister128Result).toBe(3_999_998_500_000n);
            // expect(cyclesCanister128Result).toBe(4_000_001_500_000n);
        });

        it('sends cycles128 with notify', async () => {
            const sendCycles128NotifyResult =
                await intermediaryCanister.sendCycles128Notify();

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediaryCallResult =
            //     await intermediaryCanister.getCanisterBalance();
            // const cyclesCallResult =
            //     await cyclesCanister.getCanisterBalance();

            // const intermediaryCanister128Result =
            //     await intermediaryCanister.getCanisterBalance128();
            // const cyclesCanister128Result =
            //     await cyclesCanister.getCanisterBalance128();

            expect(sendCycles128NotifyResult).toBeUndefined();
            // expect(intermediaryCallResult).toBe(3_999_998_000_000n);
            // expect(cyclesCallResult).toBe(4_000_002_000_000n);
            // expect(intermediaryCanister128Result).toBe(3_999_998_000_000n);
            // expect(cyclesCanister128Result).toBe(4_000_002_000_000n);
        });
    };
}
