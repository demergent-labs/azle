import { Agent } from '@dfinity/agent';

import { getCanisterActor } from '../get_canister_actor';

export async function getActor(parentDir: string, agent?: Agent): Promise<any> {
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
