import { getCanisterId } from 'azle/dfx';
import { expect, it, please, Test } from 'azle/test/jest';
import { execSync } from 'child_process';

import { createActor } from '../dfx_generated/canister_init_and_post_upgrade';

export function getTests(): Test {
    const canisterId = getCanisterId('canister_init_and_post_upgrade');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return () => {
        it('properly hooks up http functionality to a canister with a developer defined init method', async () => {
            const httpQueryResponse = await fetch(`${origin}/http-query`);
            const httpQueryResponseText = await httpQueryResponse.text();

            const httpUpdateResponse = await fetch(`${origin}/http-update`, {
                method: 'POST'
            });
            const httpUpdateResponseText = await httpUpdateResponse.text();

            const candidQueryText = await actor.candidQuery();
            const candidUpdateText = await actor.candidUpdate();

            expect(httpQueryResponseText).toBe(
                'http-query-canister-init-and-post-upgrade-init'
            );
            expect(httpUpdateResponseText).toBe(
                'http-update-canister-init-and-post-upgrade-init'
            );
            expect(candidQueryText).toBe(
                'candidQueryCanisterInitAndPostUpgrade-init'
            );
            expect(candidUpdateText).toBe(
                'candidUpdateCanisterInitAndPostUpgrade-init'
            );
        });

        please('deploy canister_init_and_post_upgrade', async () => {
            execSync(
                `dfx deploy --upgrade-unchanged canister_init_and_post_upgrade`,
                {
                    stdio: 'inherit'
                }
            );
        });

        it('properly hooks up http functionality to a canister with a developer defined postUpgrade method', async () => {
            const httpQueryResponse = await fetch(`${origin}/http-query`);
            const httpQueryResponseText = await httpQueryResponse.text();

            const httpUpdateResponse = await fetch(`${origin}/http-update`, {
                method: 'POST'
            });
            const httpUpdateResponseText = await httpUpdateResponse.text();

            const candidQueryText = await actor.candidQuery();
            const candidUpdateText = await actor.candidUpdate();

            expect(httpQueryResponseText).toBe(
                'http-query-canister-init-and-post-upgrade-postUpgrade'
            );
            expect(httpUpdateResponseText).toBe(
                'http-update-canister-init-and-post-upgrade-postUpgrade'
            );
            expect(candidQueryText).toBe(
                'candidQueryCanisterInitAndPostUpgrade-postUpgrade'
            );
            expect(candidUpdateText).toBe(
                'candidUpdateCanisterInitAndPostUpgrade-postUpgrade'
            );
        });
    };
}
