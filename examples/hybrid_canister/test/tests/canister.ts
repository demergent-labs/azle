import { getCanisterId } from 'azle/dfx';
import { Test } from 'azle/test';

import { createActor } from '../dfx_generated/canister';

export function getTests(): Test[] {
    const canisterId = getCanisterId('canister');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return [
        {
            name: 'canister',
            test: async () => {
                try {
                    const httpQueryResponse = await fetch(
                        `${origin}/http-query`
                    );
                    const httpQueryResponseText =
                        await httpQueryResponse.text();

                    const httpUpdateResponse = await fetch(
                        `${origin}/http-update`,
                        {
                            method: 'POST'
                        }
                    );
                    const httpUpdateResponseText =
                        await httpUpdateResponse.text();

                    const candidQueryText = await actor.candidQuery();
                    const candidUpdateText = await actor.candidUpdate();

                    return {
                        Ok:
                            httpQueryResponseText === 'http-query-canister' &&
                            httpUpdateResponseText === 'http-update-canister' &&
                            candidQueryText === 'candidQueryCanister' &&
                            candidUpdateText === 'candidUpdateCanister'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        }
    ];
}
