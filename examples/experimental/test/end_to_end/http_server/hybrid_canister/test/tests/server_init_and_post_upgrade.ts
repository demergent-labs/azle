import { getCanisterId } from 'azle/_internal/dfx';
import { expect, it, please } from 'azle/_internal/test';
import { execSync } from 'child_process';

import { createActor } from '../dfx_generated/server_init_and_post_upgrade';

export function getTests(): void {
    const canisterId = getCanisterId('server_init_and_post_upgrade');
    const origin = `http://${canisterId}.raw.localhost:4943`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    });

    it('handles an HTTP server canister with additional query, update, and init methods', async () => {
        const httpQueryResponse = await fetch(`${origin}/http-query`);
        const httpQueryResponseText = await httpQueryResponse.text();

        const httpUpdateResponse = await fetch(`${origin}/http-update`, {
            method: 'POST'
        });
        const httpUpdateResponseText = await httpUpdateResponse.text();

        const candidQueryText = await actor.candidQuery();
        const candidUpdateText = await actor.candidUpdate();

        expect(httpQueryResponseText).toBe(
            'http-query-server-init-and-post-upgrade-init'
        );
        expect(httpUpdateResponseText).toBe(
            'http-update-server-init-and-post-upgrade-init'
        );
        expect(candidQueryText).toBe(
            'candidQueryServerInitAndPostUpgrade-init'
        );
        expect(candidUpdateText).toBe(
            'candidUpdateServerInitAndPostUpgrade-init'
        );
    });

    please('deploy server_init_and_post_upgrade', async () => {
        execSync(
            `dfx deploy --upgrade-unchanged server_init_and_post_upgrade`,
            {
                stdio: 'inherit'
            }
        );
    });

    it('handles an HTTP server canister with additional query, update, and post_upgrade methods', async () => {
        const httpQueryResponse = await fetch(`${origin}/http-query`);
        const httpQueryResponseText = await httpQueryResponse.text();

        const httpUpdateResponse = await fetch(`${origin}/http-update`, {
            method: 'POST'
        });
        const httpUpdateResponseText = await httpUpdateResponse.text();

        const candidQueryText = await actor.candidQuery();
        const candidUpdateText = await actor.candidUpdate();

        expect(httpQueryResponseText).toBe(
            'http-query-server-init-and-post-upgrade-postUpgrade'
        );
        expect(httpUpdateResponseText).toBe(
            'http-update-server-init-and-post-upgrade-postUpgrade'
        );
        expect(candidQueryText).toBe(
            'candidQueryServerInitAndPostUpgrade-postUpgrade'
        );
        expect(candidUpdateText).toBe(
            'candidUpdateServerInitAndPostUpgrade-postUpgrade'
        );
    });
}
