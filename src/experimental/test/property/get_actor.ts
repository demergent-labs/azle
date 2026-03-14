import '#experimental/build/assert_experimental';

import { ActorSubclass, Agent, HttpAgent } from '@icp-sdk/core/agent';
import { createRequire } from 'module';

import { normalizeDfxGeneratedFiles } from '#test/normalize_dfx_generated';
import { createLocalReplicaCompatibleFetch } from '#utils/create_local_replica_compatible_fetch';
import { getCanisterId } from '#utils/dfx';

/**
 * Creates an actor instance with require (not ES module) cache clearing functionality
 * @param parentDir - Parent directory path containing the dfx generated files
 * @param agent - Optional pre-configured agent
 * @returns A promise that resolves to the actor instance
 */
export async function getActor<T>(
    parentDir: string,
    agent?: Agent
): Promise<ActorSubclass<T> & { [key: string]: any }> {
    const require = createRequire(import.meta.url);
    const generatedDirectoryPath = `${parentDir}/dfx_generated`;
    const generatedCanisterPath = `${generatedDirectoryPath}/canister`;

    normalizeDfxGeneratedFiles(generatedDirectoryPath);

    const resolvedPathIndex = require.resolve(
        `${generatedCanisterPath}/index.js`
    );
    const resolvedPathDid = require.resolve(
        `${generatedCanisterPath}/canister.did.js`
    );

    delete require.cache[resolvedPathIndex];
    delete require.cache[resolvedPathDid];

    const { createActor } = require(generatedCanisterPath);
    const host = 'http://127.0.0.1:4943';

    return createActor(getCanisterId('canister'), {
        agent:
            agent ??
            (await HttpAgent.create({
                host,
                shouldFetchRootKey: true,
                verifyQuerySignatures: false,
                fetch: createLocalReplicaCompatibleFetch(host)
            }))
    });
}
