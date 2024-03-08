import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { getCanisterId, Test } from 'azle/test';
import { createActor as createActorServer } from './dfx_generated/server';
import { createActor as createActorServerInitAndPostUpgrade } from './dfx_generated/server_init_and_post_upgrade';
import { createActor as createActorCanister } from './dfx_generated/canister';

export function getTests(): Test[] {
    const canisterIdServer = getCanisterId('server');
    const canisterIdServerInitAndPostUpgrade = getCanisterId(
        'server_init_and_post_upgrade'
    );
    const canisterIdCanister = getCanisterId('canister');

    const originServer = `http://${canisterIdServer}.localhost:8000`;
    const originServerInitAndPostUpgrade = `http://${canisterIdServerInitAndPostUpgrade}.localhost:8000`;
    const originCanister = `http://${canisterIdCanister}.localhost:8000`;

    const actorServer = createActorServer(canisterIdServer, {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });
    const actorServerInitAndPostUpgrade = createActorServerInitAndPostUpgrade(
        canisterIdServerInitAndPostUpgrade,
        {
            agentOptions: {
                host: 'http://127.0.0.1:8000'
            }
        }
    );
    const actorCanister = createActorCanister(canisterIdCanister, {
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
                        `${originServer}/http-query`
                    );
                    const httpQueryResponseText =
                        await httpQueryResponse.text();

                    const httpUpdateResponse = await fetch(
                        `${originServer}/http-update`,
                        {
                            method: 'POST'
                        }
                    );
                    const httpUpdateResponseText =
                        await httpUpdateResponse.text();

                    const candidQueryText = await actorServer.candidQuery();
                    const candidUpdateText = await actorServer.candidUpdate();

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
        },
        {
            name: 'server_init_and_post_upgrade',
            test: async () => {
                try {
                    const httpQueryResponse = await fetch(
                        `${originServerInitAndPostUpgrade}/http-query`
                    );
                    const httpQueryResponseText =
                        await httpQueryResponse.text();

                    const httpUpdateResponse = await fetch(
                        `${originServerInitAndPostUpgrade}/http-update`,
                        {
                            method: 'POST'
                        }
                    );
                    const httpUpdateResponseText =
                        await httpUpdateResponse.text();

                    const candidQueryText =
                        await actorServerInitAndPostUpgrade.candidQuery();
                    const candidUpdateText =
                        await actorServerInitAndPostUpgrade.candidUpdate();

                    return {
                        Ok:
                            httpQueryResponseText ===
                                'http-query-server-init-and-post-upgrade' &&
                            httpUpdateResponseText ===
                                'http-update-server-init-and-post-upgrade' &&
                            candidQueryText ===
                                'candidQueryServerInitAndPostUpgrade' &&
                            candidUpdateText ===
                                'candidUpdateServerInitAndPostUpgrade'
                    };
                } catch (error: any) {
                    return {
                        Err: error
                    };
                }
            }
        },
        {
            name: 'canister',
            test: async () => {
                try {
                    const httpQueryResponse = await fetch(
                        `${originCanister}/http-query`
                    );
                    const httpQueryResponseText =
                        await httpQueryResponse.text();

                    const httpUpdateResponse = await fetch(
                        `${originCanister}/http-update`,
                        {
                            method: 'POST'
                        }
                    );
                    const httpUpdateResponseText =
                        await httpUpdateResponse.text();

                    const candidQueryText = await actorCanister.candidQuery();
                    const candidUpdateText = await actorCanister.candidUpdate();

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
