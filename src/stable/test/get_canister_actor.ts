import { HttpAgent, Identity } from '@dfinity/agent';
import { ActorSubclass } from '@dfinity/agent';
import { Agent } from '@dfinity/agent';
import { join } from 'path';

import { getCanisterId } from '#utils/dfx';

type GetCanisterActorOptions = {
    /** Optional identity for authentication */
    identity?: Identity;
    /** Optional pre-configured agent */
    agent?: Agent;
    /** Optional parent directory path for the dfx generated files */
    parentDir?: string;
};

/**
 * Creates an actor instance for interacting with a canister
 * @param canisterName - Name of the canister to create an actor for
 * @param options - Configuration options
 * @returns A promise that resolves to the actor instance
 */
export async function getCanisterActor<T>(
    canisterName: string,
    options: GetCanisterActorOptions = {}
): Promise<ActorSubclass<T>> {
    const parentDir = options.parentDir ?? join(process.cwd(), 'test');
    const { createActor } = await import(
        join(parentDir, 'dfx_generated', canisterName)
    );

    // Check if running in CI environment - increase timeout for CI
    const isCI =
        process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
    const ingressExpiryInMinutes = isCI ? 20 : 5; // 20 minutes for CI, 5 minutes default

    const agent =
        options.agent ??
        (await HttpAgent.create({
            host: 'http://127.0.0.1:4943',
            identity: options.identity,
            shouldFetchRootKey: true,
            ingressExpiryInMinutes
        }));

    const actor = createActor(getCanisterId(canisterName), {
        agent
    });

    return actor;
}
