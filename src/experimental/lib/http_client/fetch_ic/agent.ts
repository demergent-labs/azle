import { Agent, HttpAgent, Identity } from '@icp-sdk/core/agent';

import { createLocalReplicaCompatibleFetch } from '#utils/create_local_replica_compatible_fetch';

export async function createAgent(
    identity: Identity,
    host: string
): Promise<Agent> {
    const runningLocally =
        host.includes(`localhost:`) || host.includes(`127.0.0.1:`);

    return HttpAgent.create({
        host,
        identity,
        shouldFetchRootKey: runningLocally,
        verifyQuerySignatures: runningLocally === false,
        fetch: createLocalReplicaCompatibleFetch(host)
    });
}
