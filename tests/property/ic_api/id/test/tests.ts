import { Principal } from '@dfinity/principal';
import { defaultParams, expect, getCanisterActor, it, Test } from 'azle/test';
import { execSync } from 'child_process';
import fc from 'fast-check';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('should deploy and check all canister id methods', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 254
                    }),
                    async (nat) => {
                        // We need to ensure that the canister id that we generate is on the
                        // correct local subnet. We've taken the binary representation of
                        // be2us-64aaa-aaaaa-qaabq-cai and just add to the end of it
                        const canisterId = Principal.fromUint8Array(
                            Uint8Array.from([
                                128,
                                0,
                                0,
                                0,
                                0,
                                16,
                                0,
                                3,
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

                        const initId = await actor.getInitId();
                        expect(initId[0]?.toText()).toEqual(canisterIdText);

                        const postUpgradeId = await actor.getPostUpgradeId();
                        expect(postUpgradeId).toHaveLength(0);

                        const preUpgradeId = await actor.getPreUpgradeId();
                        expect(preUpgradeId).toHaveLength(0);

                        await actor.setInspectMessageId();
                        const inspectMessageId =
                            await actor.getInspectMessageId();
                        expect(inspectMessageId[0]?.toText()).toEqual(
                            canisterIdText
                        );

                        const queryId = await actor.getQueryId();
                        expect(queryId.toText()).toEqual(canisterIdText);

                        const updateId = await actor.getUpdateId();
                        expect(updateId.toText()).toEqual(canisterIdText);

                        execSync(`dfx deploy canister --upgrade-unchanged`);

                        const postUpgradeIdAfterUpgrade =
                            await actor.getPostUpgradeId();
                        expect(postUpgradeIdAfterUpgrade[0]?.toText()).toEqual(
                            canisterIdText
                        );

                        const preUpgradeIdAfterUpgrade =
                            await actor.getPreUpgradeId();
                        expect(preUpgradeIdAfterUpgrade[0]?.toText()).toEqual(
                            canisterIdText
                        );
                    }
                ),
                defaultParams
            );
        });
    };
}
