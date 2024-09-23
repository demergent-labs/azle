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
        it('should deploy and check all canister id methods', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 10
                    }),
                    async (nat) => {
                        console.log(nat);
                        let expectedVersion = 0n;

                        execSync(`dfx deploy canister`);
                        expectedVersion += 1n; // Increment after deploy

                        const actor = await getCanisterActor<Actor>('canister');

                        const initCanisterVersion =
                            await actor.getInitCanisterVersion();
                        expect(initCanisterVersion[0]).toBeGreaterThanOrEqual(
                            expectedVersion
                        );

                        const postUpgradeCanisterVersion =
                            await actor.getPostUpgradeCanisterVersion();
                        expect(postUpgradeCanisterVersion).toHaveLength(0);

                        const preUpgradeCanisterVersion =
                            await actor.getPreUpgradeCanisterVersion();
                        expect(preUpgradeCanisterVersion).toHaveLength(0);

                        await actor.setInspectMessageCanisterVersion();
                        const inspectMessageCanisterVersion =
                            await actor.getInspectMessageCanisterVersion();
                        expect(
                            inspectMessageCanisterVersion[0]
                        ).toBeGreaterThanOrEqual(expectedVersion);
                        expectedVersion += 1n; // Increment after state change

                        expect(
                            await actor.getQueryCanisterVersion()
                        ).toBeGreaterThanOrEqual(expectedVersion);

                        expect(
                            await actor.getUpdateCanisterVersion()
                        ).toBeGreaterThanOrEqual(expectedVersion);
                        expectedVersion += 1n; // Increment after state change

                        for (let i = 1n; i < nat; i++) {
                            execSync(`dfx deploy canister --upgrade-unchanged`);
                            expectedVersion += 1n; // Increment after deploy

                            const postUpgradeCanisterVersionAfterUpgrade =
                                await actor.getPostUpgradeCanisterVersion();
                            expect(
                                postUpgradeCanisterVersionAfterUpgrade[0]
                            ).toBeGreaterThanOrEqual(expectedVersion);

                            const preUpgradeCanisterVersionAfterUpgrade =
                                await actor.getPreUpgradeCanisterVersion();
                            expect(
                                preUpgradeCanisterVersionAfterUpgrade[0]
                            ).toBeGreaterThanOrEqual(expectedVersion);

                            expect(
                                await actor.getQueryCanisterVersion()
                            ).toBeGreaterThanOrEqual(expectedVersion);

                            expect(
                                await actor.getUpdateCanisterVersion()
                            ).toBeGreaterThanOrEqual(expectedVersion);
                            expectedVersion += 1n; // Increment after state change
                        }
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
