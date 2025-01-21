import { expect, getCanisterActor, it, please, Test } from 'azle/test';
import { execSync } from 'child_process';

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

export function getTests(): Test {
    return () => {
        it('verifies init is running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await checkInitIsInReplicatedExecution(actor, true);
            await checkUpgradeIsInReplicatedExecution(actor, true);
        });

        it('verifies inspectMessage is running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (let i = 0; i < 10; i++) {
                expect(
                    await actor.getInspectMessageIsInReplicatedExecution()
                ).toBe(false);
            }
        });

        it('verifies non-replicated queries are not running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (let i = 0; i < 10; i++) {
                expect(await actor.getQueryIsInReplicatedExecution()).toBe(
                    false
                );
            }
        });

        it('verifies replicated queries are running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (let i = 0; i < 10; i++) {
                expect(
                    await actor.getQueryInReplicatedModeIsInReplicatedExecution()
                ).toBe(true);
            }
        });

        it('verifies composite queries are not running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (let i = 0; i < 10; i++) {
                expect(
                    await actor.getCompositeQueryIsInReplicatedExecution()
                ).toBe(false);
            }
        });

        it('verifies update is running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (let i = 0; i < 10; i++) {
                expect(await actor.getUpdateIsInReplicatedExecution()).toBe(
                    true
                );
            }
        });

        it('verifies heartbeat is running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            expect(
                await actor.getHeartbeatIsInReplicatedExecution()
            ).toStrictEqual([true]);
        });

        please('redeploy the canister', async () => {
            execSync(`dfx deploy canister --upgrade-unchanged`);
        });

        it('verifies pre and post upgrade are running in replicated execution after redeploy', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            await checkInitIsInReplicatedExecution(actor, false);
            await checkUpgradeIsInReplicatedExecution(actor, false);
        });

        it('verifies timer is running in replicated execution', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            expect(await actor.getTimerIsInReplicatedExecution()).toStrictEqual(
                [true]
            );
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
        expect(initIsInReplicatedExecution).toStrictEqual([]);
    } else {
        expect(initIsInReplicatedExecution).toStrictEqual([true]);
    }
}

async function checkUpgradeIsInReplicatedExecution(
    actor: Actor,
    isInitialDeployment: boolean
): Promise<void> {
    if (isInitialDeployment === true) {
        const postUpgradeCanisterVersion =
            await actor.getPostUpgradeIsInReplicatedExecution();
        expect(postUpgradeCanisterVersion).toStrictEqual([]);

        const preUpgradeCanisterVersion =
            await actor.getPreUpgradeIsInReplicatedExecution();
        expect(preUpgradeCanisterVersion).toStrictEqual([]);
    } else {
        const postUpgradeCanisterVersionAfterUpgrade =
            await actor.getPostUpgradeIsInReplicatedExecution();
        expect(postUpgradeCanisterVersionAfterUpgrade).toStrictEqual([true]);

        const preUpgradeCanisterVersionAfterUpgrade =
            await actor.getPreUpgradeIsInReplicatedExecution();
        expect(preUpgradeCanisterVersionAfterUpgrade).toStrictEqual([true]);
    }
}
