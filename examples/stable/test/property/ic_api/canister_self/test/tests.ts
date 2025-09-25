import { Principal } from '@icp-sdk/core/principal';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('asserts id static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });

        it('should deploy and check all canister id methods', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 254
                    }),
                    async (nat) => {
                        // To use --specified-id, we need to ensure that the canister id that we generate is on the
                        // ICP mainnet. We've taken the binary representation of
                        // lyt4m-myaaa-aaaac-aadkq-cai and just add to the end of it.
                        // lyt4m-myaaa-aaaac-aadkq-cai is just a random canister id I found on the dashboard.
                        const canisterId = Principal.fromUint8Array(
                            Uint8Array.from([
                                0,
                                0,
                                0,
                                0,
                                0,
                                64,
                                0,
                                213,
                                1,
                                1 + nat
                            ])
                        );
                        const canisterIdText = canisterId.toText();

                        execSync(`dfx canister stop canister`, {
                            stdio: 'inherit'
                        });

                        execSync(`dfx canister delete canister`, {
                            stdio: 'inherit'
                        });

                        execSync(
                            `dfx deploy canister --no-wallet --specified-id ${canisterIdText}`
                        );

                        const actor = await getCanisterActor<Actor>('canister');

                        const initCanisterSelf =
                            await actor.getInitCanisterSelf();
                        expect(initCanisterSelf[0]?.toText()).toEqual(
                            canisterIdText
                        );

                        const postUpgradeCanisterSelf =
                            await actor.getPostUpgradeCanisterSelf();
                        expect(postUpgradeCanisterSelf).toHaveLength(0);

                        const preUpgradeCanisterSelf =
                            await actor.getPreUpgradeCanisterSelf();
                        expect(preUpgradeCanisterSelf).toHaveLength(0);

                        await actor.setInspectMessageCanisterSelf();
                        const inspectMessageCanisterSelf =
                            await actor.getInspectMessageCanisterSelf();
                        expect(inspectMessageCanisterSelf[0]?.toText()).toEqual(
                            canisterIdText
                        );

                        const queryCanisterSelf =
                            await actor.getQueryCanisterSelf();
                        expect(queryCanisterSelf.toText()).toEqual(
                            canisterIdText
                        );

                        const updateCanisterSelf =
                            await actor.getUpdateCanisterSelf();
                        expect(updateCanisterSelf.toText()).toEqual(
                            canisterIdText
                        );

                        execSync(`dfx deploy canister --upgrade-unchanged`);

                        const postUpgradeCanisterSelfAfterUpgrade =
                            await actor.getPostUpgradeCanisterSelf();
                        expect(
                            postUpgradeCanisterSelfAfterUpgrade[0]?.toText()
                        ).toEqual(canisterIdText);

                        const preUpgradeCanisterSelfAfterUpgrade =
                            await actor.getPreUpgradeCanisterSelf();
                        expect(
                            preUpgradeCanisterSelfAfterUpgrade[0]?.toText()
                        ).toEqual(canisterIdText);
                    }
                ),
                defaultPropTestParams()
            );
        });
    };
}
