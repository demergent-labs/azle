import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should burn the cycles', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.bigUint({
                        max: 1_000_000_000_000_000n
                    }),
                    async (amount) => {
                        execSync(
                            `dfx ledger fabricate-cycles --canister canister --cycles 1000000000000000`,
                            { stdio: 'inherit' }
                        );

                        const actor = await getCanisterActor<Actor>('canister');

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
                defaultPropTestParams()
            );
        });

        it('verifies canisterBalance returns a bigint', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            const result = await actor.canisterBalanceTypesAreCorrect();
            expect(result).toBe(true);
        });

        it('verifies updateCyclesBurn returns a bigint and accepts a bigint', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            const result = await actor.cyclesBurnTypesAreCorrect(0n);
            expect(result).toBe(true);
        });
    };
}
