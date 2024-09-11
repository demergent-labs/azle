import { getCanisterId } from 'azle/dfx';
import { defaultPropTestParams, expect, it, Test } from 'azle/test';
import fc from 'fast-check';

import { execSyncPretty } from '../../../../../src/build/stable/utils/exec_sync_pretty';
import { createActor } from './dfx_generated/canister';

export function getTests(): Test {
    return () => {
        it('should burn the cycles', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.bigUint({
                        max: 1_000_000_000_000_000n
                    }),
                    async (amount) => {
                        execSyncPretty(
                            `dfx ledger fabricate-cycles --canister canister --cycles 1000000000000000`,
                            'inherit'
                        );

                        const actor = createActor(getCanisterId('canister'), {
                            agentOptions: {
                                host: 'http://127.0.0.1:8000'
                            }
                        });

                        const cycleBalanceBefore =
                            await actor.getCycleBalance();
                        const cyclesBurned =
                            await actor.updateCyclesBurn(amount);
                        const cycleBalanceAfter = await actor.getCycleBalance();

                        expect(
                            cycleBalanceBefore -
                                cycleBalanceAfter -
                                cyclesBurned
                        ).toBeLessThanOrEqual(250_000n);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
