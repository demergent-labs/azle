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
        it('gets the canister version from the canister', async () => {
            await fc.assert(
                fc.asyncProperty(
                    fc.nat({
                        max: 10
                    }),
                    async (timesToDeploy) => {
                        // Stop and delete the canister before every run
                        execSync(`dfx canister stop canister || true`, {
                            stdio: 'inherit'
                        });

                        execSync(`dfx canister delete canister || true`, {
                            stdio: 'inherit'
                        });

                        execSync(`dfx deploy canister`, {
                            stdio: 'inherit'
                        });

                        const startingVer = 1n; // Canister starts at 0 when it's created but the deploy in pretest should increment it to be at 1 by the time it gets here

                        const actor = await getCanisterActor<Actor>('canister');

                        await checkInitVersion(actor, startingVer);
                        await checkUpgradeVersion(actor, []);
                        await checkInspectVersion(actor, startingVer);
                        await checkQueryAndUpdateVersion(
                            actor,
                            startingVer + 1n
                        );

                        const versionsAtDeploy = Array.from(
                            { length: timesToDeploy },
                            (_, index) => BigInt(index * 2) + startingVer
                        );

                        for (const version of versionsAtDeploy) {
                            execSync(`dfx deploy canister --upgrade-unchanged`);

                            await checkUpgradeVersion(actor, [version]);
                            await checkQueryAndUpdateVersion(actor, version);
                        }
                    }
                ),
                defaultPropTestParams
            );
        });
    };
}

async function checkInitVersion(
    actor: Actor,
    expectedVer: bigint
): Promise<void> {
    const initCanisterVersion = await actor.getInitCanisterVersion();

    expect(initCanisterVersion).toHaveLength(1);
    expect(initCanisterVersion[0]).toBeGreaterThanOrEqual(expectedVer);
}

async function checkUpgradeVersion(
    actor: Actor,
    expectedVersion: [bigint] | []
): Promise<void> {
    if (expectedVersion.length === 0) {
        const postUpgradeCanisterVersion =
            await actor.getPostUpgradeCanisterVersion();
        expect(postUpgradeCanisterVersion).toHaveLength(0);

        const preUpgradeCanisterVersion =
            await actor.getPreUpgradeCanisterVersion();
        expect(preUpgradeCanisterVersion).toHaveLength(0);
    } else {
        const postUpgradeCanisterVersionAfterUpgrade =
            await actor.getPostUpgradeCanisterVersion();
        expect(
            postUpgradeCanisterVersionAfterUpgrade[0]
        ).toBeGreaterThanOrEqual(expectedVersion[0]);

        const preUpgradeCanisterVersionAfterUpgrade =
            await actor.getPreUpgradeCanisterVersion();
        expect(preUpgradeCanisterVersionAfterUpgrade[0]).toBeGreaterThanOrEqual(
            expectedVersion[0]
        );
    }
}

async function checkQueryAndUpdateVersion(
    actor: Actor,
    expectedVersion: bigint
): Promise<void> {
    expect(await actor.getQueryCanisterVersion()).toBeGreaterThanOrEqual(
        expectedVersion
    );
    expect(await actor.getUpdateCanisterVersion()).toBeGreaterThanOrEqual(
        expectedVersion
    );
    expect(await actor.getQueryCanisterVersion()).toBeGreaterThanOrEqual(
        expectedVersion + 1n
    );
}

async function checkInspectVersion(
    actor: Actor,
    expectedVersion: bigint
): Promise<void> {
    await actor.setInspectMessageCanisterVersion();
    const inspectMessageCanisterVersion =
        await actor.getInspectMessageCanisterVersion();

    expect(inspectMessageCanisterVersion[0]).toBeGreaterThanOrEqual(
        expectedVersion
    );
}
