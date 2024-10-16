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

type DeployCanisterOptions = {
    setData?: boolean;
    force?: boolean;
};

export function getTests(): Test {
    return () => {
        it('sets certified data and gets the certified data', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor = await getCanisterActor<Actor>('canister');
                        uninstallCanister();
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getCertificate()).toEqual([]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        expect(await actor.getCertificate()).toEqual([
                            arbitraryData
                        ]);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('sets certified data in init', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor = await getCanisterActor<Actor>('canister');
                        uninstallCanister();
                        deployCanister({ setData: true });

                        // Check that getCertificate returns [0] initially
                        expect(await actor.getCertificate()).toEqual([
                            new Uint8Array([0])
                        ]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        expect(await actor.getCertificate()).toEqual([
                            arbitraryData
                        ]);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('sets certified data in post upgrade', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor = await getCanisterActor<Actor>('canister');
                        uninstallCanister();
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getCertificate()).toEqual([]);

                        deployCanister({ setData: true, force: true });

                        // Check that getCertificate returns [0] after upgrade
                        const upgradedCertificate =
                            await actor.getCertificate();
                        expect(upgradedCertificate).toEqual([
                            new Uint8Array([0])
                        ]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getCertificate();
                        expect(updatedCertificate).toEqual([arbitraryData]);
                    }
                ),
                defaultPropTestParams
            );
        });

        it('sets certified data in preUpgrade', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.uint8Array({ minLength: 1, maxLength: 32 }),
                    async (arbitraryData) => {
                        const actor = await getCanisterActor<Actor>('canister');
                        uninstallCanister();
                        deployCanister();

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getCertificate()).toEqual([]);

                        // Upgrade the canister
                        deployCanister({ force: true });

                        // Check that getCertificate returns an empty array initially
                        expect(await actor.getCertificate()).toEqual([]);

                        deployCanister({ force: true });

                        // Check that getCertificate returns [0] after upgrade
                        const preUpgradeCertificate =
                            await actor.getCertificate();
                        expect(preUpgradeCertificate).toEqual([
                            new Uint8Array([0])
                        ]);

                        // Set the certified data
                        await actor.setData(arbitraryData);

                        // Check that getCertificate now returns the set data
                        const updatedCertificate = await actor.getCertificate();
                        expect(updatedCertificate).toEqual([arbitraryData]);
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}

function uninstallCanister(): void {
    execSync(`dfx canister uninstall-code canister || true`, {
        stdio: 'inherit'
    });
}

function deployCanister(options: DeployCanisterOptions = {}): void {
    const { setData = false, force = false } = options;
    let command = `dfx deploy canister --argument '(${setData})'`;
    if (force) {
        command += ' --upgrade-unchanged';
    }
    execSync(command, { stdio: 'inherit' });
}
