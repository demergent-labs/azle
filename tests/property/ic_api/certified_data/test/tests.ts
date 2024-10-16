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
        it('sets certified data and gets the certificate', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    fc.boolean(),
                    fc.boolean(),
                    async (
                        arbitraryData,
                        setDataInInit,
                        setDataInPostUpgrade
                    ) => {
                        const actor = await getCanisterActor<Actor>('canister');
                        execSync(
                            `dfx canister uninstall-code canister || true`,
                            {
                                stdio: 'inherit'
                            }
                        );
                        execSync(
                            `dfx deploy canister --argument '(${setDataInInit})'`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        // Check that getCertificate returns an empty array initially
                        const initialCertificate = await actor.getCertificate();
                        if (setDataInInit) {
                            expect(initialCertificate).toEqual([
                                new Uint8Array([0])
                            ]);
                        } else {
                            expect(initialCertificate).toEqual([]);
                        }

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getCertificate();
                        expect(updatedCertificate).toEqual([arbitraryData]);

                        execSync(
                            `dfx deploy canister --argument '(${setDataInPostUpgrade})' --upgrade-unchanged`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        // Check that getCertificate returns an empty array after reinstalling
                        const reinstalledCertificate =
                            await actor.getCertificate();
                        if (setDataInPostUpgrade) {
                            expect(reinstalledCertificate).toEqual([
                                new Uint8Array([0])
                            ]);
                        } else {
                            expect(initialCertificate).toEqual([]);
                        }

                        // Check that setData works in preUpgrade
                        execSync(
                            `dfx deploy canister --argument '(false)' --upgrade-unchanged`,
                            {
                                stdio: 'inherit'
                            }
                        );

                        const preUpgradeCertificate =
                            await actor.getCertificate();
                        expect(preUpgradeCertificate).toEqual([
                            new Uint8Array([0])
                        ]);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}
