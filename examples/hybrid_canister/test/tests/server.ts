import { getCanisterId } from 'azle/dfx';
import { expect, it, Test } from 'azle/test/jest';

import { createActor } from '../dfx_generated/server';

export function getTests(): Test {
    const canisterId = getCanisterId('server');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return () => {
        it('handles a http server canister with additional query and update methods', async () => {
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
