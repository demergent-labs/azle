import { getCanisterId } from 'azle/dfx';
import { error, Test, testEquality } from 'azle/test';

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

                    return testEquality(
                        [
                            httpQueryResponseText,
                            httpUpdateResponseText,
                            candidQueryText,
                            candidUpdateText
                        ],

                        [
                            'http-query-server',
                            'http-update-server',
                            'candidQueryServer',
                            'candidUpdateServer'
                        ]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
