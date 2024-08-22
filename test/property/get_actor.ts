import { Agent, HttpAgent } from '@dfinity/agent';

import { getCanisterId } from '../../dfx';

export function getActor(parentDir: string, agent?: Agent): any {
    const resolvedPathIndex = require.resolve(
        `${parentDir}/dfx_generated/canister/index.js`
    );
    const resolvedPathDid = require.resolve(
        `${parentDir}/dfx_generated/canister/canister.did.js`
    );

    delete require.cache[resolvedPathIndex];
    delete require.cache[resolvedPathDid];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createActor } = require(`${parentDir}/dfx_generated/canister`);

    return createActor(getCanisterId('canister'), {
        agent:
            agent ??
            new HttpAgent({
                host: 'http://127.0.0.1:8000',
                verifyQuerySignatures: false // TODO Major issue: https://forum.dfinity.org/t/agent-js-0-20-0-is-released-replica-signed-query-edition/24743/16?u=lastmjs
            })
    });
}
