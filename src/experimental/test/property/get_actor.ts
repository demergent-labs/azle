import '#experimental/build/assert_experimental';

import { ActorSubclass, Agent, HttpAgent } from '@icp-sdk/core/agent';
import { createRequire } from 'module';

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
    const resolvedPathIndex = require.resolve(
        `${parentDir}/dfx_generated/canister/index.js`
    );
    const resolvedPathDid = require.resolve(
        `${parentDir}/dfx_generated/canister/canister.did.js`
    );

    delete require.cache[resolvedPathIndex];
    delete require.cache[resolvedPathDid];

    const { createActor } = require(`${parentDir}/dfx_generated/canister`);

    return createActor(getCanisterId('canister'), {
        agent:
            agent ??
            (await HttpAgent.create({
                host: 'http://127.0.0.1:4943',
                shouldFetchRootKey: true
            }))
    });
}
