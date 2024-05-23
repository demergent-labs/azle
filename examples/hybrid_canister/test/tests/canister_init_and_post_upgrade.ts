import { getCanisterId } from 'azle/dfx';
import { error, Test, testEquality } from 'azle/test';
import { execSync } from 'child_process';

import { createActor } from '../dfx_generated/canister_init_and_post_upgrade';

export function getTests(): Test[] {
    const canisterId = getCanisterId('canister_init_and_post_upgrade');
    const origin = `http://${canisterId}.localhost:8000`;
    const actor = createActor(canisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });

    return [
        {
            name: 'canister_init_and_post_upgrade init',
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
                            'http-query-canister-init-and-post-upgrade-init',
                            'http-update-canister-init-and-post-upgrade-init',
                            'candidQueryCanisterInitAndPostUpgrade-init',
                            'candidUpdateCanisterInitAndPostUpgrade-init'
                        ]
                    );
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'deploy canister_init_and_post_upgrade',
            prep: async () => {
                execSync(
                    `dfx deploy --upgrade-unchanged canister_init_and_post_upgrade`,
                    {
                        stdio: 'inherit'
                    }
                );
            }
        },
        {
            name: 'canister_init_and_post_upgrade postUpgrade',
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
                            'http-query-canister-init-and-post-upgrade-postUpgrade',
                            'http-update-canister-init-and-post-upgrade-postUpgrade',
                            'candidQueryCanisterInitAndPostUpgrade-postUpgrade',
                            'candidUpdateCanisterInitAndPostUpgrade-postUpgrade'
                        ]
                    );
                } catch (err: any) {
                    return error(err);
                }
            }
        }
    ];
}
