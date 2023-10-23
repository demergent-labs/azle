import { getCanisterId } from '../test';

export function getActor(parentDir: string) {
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
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    });
}
