import { getCanisterId } from 'azle/dfx';
import { Test } from 'azle/test';

import { createActor } from '../dfx_generated/server';

export function getTests(): Test[] {
    const canisterId = getCanisterId('server');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return [
        {
            name: 'server',
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
                            httpQueryResponseText === 'http-query-server' &&
                            httpUpdateResponseText === 'http-update-server' &&
                            candidQueryText === 'candidQueryServer' &&
                            candidUpdateText === 'candidUpdateServer'
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
