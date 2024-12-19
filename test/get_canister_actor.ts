import { HttpAgent, Identity } from '@dfinity/agent';
import { ActorSubclass } from '@dfinity/agent';
import { Agent } from '@dfinity/agent';
import { join } from 'path';

import { getCanisterId } from '../dfx';

type GetCanisterActorOptions = {
    identity?: Identity;
    agent?: Agent;
    parentDir?: string;
};

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
