import { getCanisterId } from 'azle/dfx';
import { Test } from 'azle/test';
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

                    return {
                        Ok:
                            httpQueryResponseText ===
                                'http-query-server-init-and-post-upgrade-init' &&
                            httpUpdateResponseText ===
                                'http-update-server-init-and-post-upgrade-init' &&
                            candidQueryText ===
                                'candidQueryServerInitAndPostUpgrade-init' &&
                            candidUpdateText ===
                                'candidUpdateServerInitAndPostUpgrade-init'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
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

                    return {
                        Ok:
                            httpQueryResponseText ===
                                'http-query-server-init-and-post-upgrade-postUpgrade' &&
                            httpUpdateResponseText ===
                                'http-update-server-init-and-post-upgrade-postUpgrade' &&
                            candidQueryText ===
                                'candidQueryServerInitAndPostUpgrade-postUpgrade' &&
                            candidUpdateText ===
                                'candidUpdateServerInitAndPostUpgrade-postUpgrade'
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
