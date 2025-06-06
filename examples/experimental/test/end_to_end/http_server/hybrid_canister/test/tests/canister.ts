import { getCanisterId } from 'azle/_internal/dfx';
import { expect, it, Test } from 'azle/_internal/test';

import { createActor } from '../dfx_generated/canister';

export function getTests(): Test {
    const canisterId = getCanisterId('canister');
    const origin = `http://${canisterId}.raw.localhost:4943`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    });

    return () => {
        it('handles a canister with additional HTTP functionality', async () => {
            const httpQueryResponse = await fetch(`${origin}/http-query`);
            const httpQueryResponseText = await httpQueryResponse.text();

            const httpUpdateResponse = await fetch(`${origin}/http-update`, {
                method: 'POST'
            });
            const httpUpdateResponseText = await httpUpdateResponse.text();

            const candidQueryText = await actor.candidQuery();
            const candidUpdateText = await actor.candidUpdate();

            expect(httpQueryResponseText).toBe('http-query-canister');
            expect(httpUpdateResponseText).toBe('http-update-canister');
            expect(candidQueryText).toBe('candidQueryCanister');
            expect(candidUpdateText).toBe('candidUpdateCanister');
        });
    };
}
