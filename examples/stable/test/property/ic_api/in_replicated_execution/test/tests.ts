import { expect, getCanisterActor, it, Test } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('gets the canister version from the canister', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await checkInitIsInReplicatedExecution(actor, true);
            await checkUpgradeIsInReplicatedExecution(actor, true);
            await checkInspectIsInReplicatedExecution(actor);
            await checkQueryAndUpdateIsInReplicatedExecution(actor);

            execSync(`dfx deploy canister --upgrade-unchanged`);

            await checkInitIsInReplicatedExecution(actor, false);
            await checkUpgradeIsInReplicatedExecution(actor, false);
            await checkInspectIsInReplicatedExecution(actor);
            await checkQueryAndUpdateIsInReplicatedExecution(actor);
        });

        it('asserts inReplicatedExecution static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });
    };
}

async function checkInitIsInReplicatedExecution(
    actor: Actor,
    isInitialDeployment: boolean
): Promise<void> {
    const initIsInReplicatedExecution =
        await actor.getInitIsInReplicatedExecution();

    if (isInitialDeployment === false) {
        expect(initIsInReplicatedExecution).toHaveLength(0);
    } else {
        expect(initIsInReplicatedExecution[0]).toBe(true);
    }
}

async function checkUpgradeIsInReplicatedExecution(
    actor: Actor,
    isInitialDeployment: boolean
): Promise<void> {
    if (isInitialDeployment === true) {
        const postUpgradeCanisterVersion =
            await actor.getPostUpgradeIsInReplicatedExecution();
        expect(postUpgradeCanisterVersion).toHaveLength(0);

        const preUpgradeCanisterVersion =
            await actor.getPreUpgradeIsInReplicatedExecution();
        expect(preUpgradeCanisterVersion).toHaveLength(0);
    } else {
        const postUpgradeCanisterVersionAfterUpgrade =
            await actor.getPostUpgradeIsInReplicatedExecution();
        expect(postUpgradeCanisterVersionAfterUpgrade[0]).toBe(true);

        const preUpgradeCanisterVersionAfterUpgrade =
            await actor.getPreUpgradeIsInReplicatedExecution();
        expect(preUpgradeCanisterVersionAfterUpgrade[0]).toBe(true);
    }
}

async function checkQueryAndUpdateIsInReplicatedExecution(
    actor: Actor
): Promise<void> {
    expect(await actor.getQueryIsInReplicatedExecution()).toBe(false);
    expect(await actor.getUpdateIsInReplicatedExecution()).toBe(true);
}

async function checkInspectIsInReplicatedExecution(
    actor: Actor
): Promise<void> {
    await actor.setInspectMessageIsInReplicatedExecution();
    const inspectMessageIsInReplicatedExecution =
        await actor.getInspectMessageIsInReplicatedExecution();

    expect(inspectMessageIsInReplicatedExecution[0]).toBe(true); // TODO: Is this because it's in front of an update?
}
