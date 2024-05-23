import { getCanisterId } from 'azle/dfx';
import { error, Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { createActor } from '../dfx_generated/server_init_and_post_upgrade';

export function getTests(): Test[] {
    const canisterId = getCanisterId('server_init_and_post_upgrade');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return [
        {
            name: 'server_init_and_post_upgrade init',
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
                            'http-query-server-init-and-post-upgrade-init',
                            'http-update-server-init-and-post-upgrade-init',
                            'candidQueryServerInitAndPostUpgrade-init',
                            'candidUpdateServerInitAndPostUpgrade-init'
                        ]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        },
        {
            name: 'deploy server_init_and_post_upgrade',
            prep: async () => {
                execSync(
                    `dfx deploy --upgrade-unchanged server_init_and_post_upgrade`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'server_init_and_post_upgrade postUpgrade',
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
                            'http-query-server-init-and-post-upgrade-postUpgrade',
                            'http-update-server-init-and-post-upgrade-postUpgrade',
                            'candidQueryServerInitAndPostUpgrade-postUpgrade',
                            'candidUpdateServerInitAndPostUpgrade-postUpgrade'
                        ]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
