import { ActorSubclass, Agent } from '@dfinity/agent';

import { getCanisterActor } from '../get_canister_actor';

/**
 * Creates an actor instance with cache clearing functionality
 * @param parentDir - Parent directory path containing the dfx generated files
 * @param agent - Optional pre-configured agent
 * @returns A promise that resolves to the actor instance
 */
export async function getActor<T>(
    parentDir: string,
    agent?: Agent
): Promise<ActorSubclass<T> & { [key: string]: any }> {
    const resolvedPathIndex = require.resolve(
        `${parentDir}/dfx_generated/canister/index.js`
    );
    const resolvedPathDid = require.resolve(
        `${parentDir}/dfx_generated/canister/canister.did.js`
    );

    delete require.cache[resolvedPathIndex];
    delete require.cache[resolvedPathDid];

    return getCanisterActor('canister', {
        parentDir,
        agent
    });
}
