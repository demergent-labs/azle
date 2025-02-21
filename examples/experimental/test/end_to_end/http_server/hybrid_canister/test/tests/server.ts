import { getCanisterId } from 'azle/_internal/dfx';
import { expect, it, Test } from 'azle/test';

import { createActor } from '../dfx_generated/server';

export function getTests(): Test {
    const canisterId = getCanisterId('server');
    const origin = `http://${canisterId}.raw.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            shouldFetchRootKey: true
        }
    });

    return () => {
        it('handles an HTTP server canister with additional query and update methods', async () => {
            const httpQueryResponse = await fetch(`${origin}/http-query`);
            const httpQueryResponseText = await httpQueryResponse.text();

            const httpUpdateResponse = await fetch(`${origin}/http-update`, {
                method: 'POST'
            });
            const httpUpdateResponseText = await httpUpdateResponse.text();

            const candidQueryText = await actor.candidQuery();
            const candidUpdateText = await actor.candidUpdate();

            expect(httpQueryResponseText).toBe('http-query-server');
            expect(httpUpdateResponseText).toBe('http-update-server');
            expect(candidQueryText).toBe('candidQueryServer');
            expect(candidUpdateText).toBe('candidUpdateServer');
        });
    };
}
