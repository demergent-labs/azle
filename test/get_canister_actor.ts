import { HttpAgent, Identity } from '@dfinity/agent';
import { ActorSubclass } from '@dfinity/agent';
import { Agent } from '@dfinity/agent';
import { join } from 'path';

import { getCanisterId } from '../dfx';

/**
 * Options for getting a canister actor
 * @interface GetCanisterActorOptions
 * @property {Identity} [identity] - Optional identity for authentication
 * @property {Agent} [agent] - Optional pre-configured agent
 * @property {string} [parentDir] - Optional parent directory path for the dfx generated files
 */
type GetCanisterActorOptions = {
    identity?: Identity;
    agent?: Agent;
    parentDir?: string;
};

/**
 * Creates an actor instance for interacting with a canister
 * @template T - The interface type of the actor
 * @param {string} canisterName - Name of the canister to create an actor for
 * @param {GetCanisterActorOptions} [options={}] - Configuration options
 * @returns {Promise<ActorSubclass<T>>} A promise that resolves to the actor instance
 */
export async function getCanisterActor<T>(
    canisterName: string,
    options: GetCanisterActorOptions = {}
): Promise<ActorSubclass<T>> {
    const parentDir = options.parentDir ?? join(process.cwd(), 'test');
    const { createActor } = await import(
        join(parentDir, 'dfx_generated', canisterName)
    );

    const agent =
        options.agent ??
        (await HttpAgent.create({
            host: 'http://127.0.0.1:8000',
            shouldFetchRootKey: true
        }));

    const actor = createActor(getCanisterId(canisterName), {
        agent
    });

    return actor;
}
