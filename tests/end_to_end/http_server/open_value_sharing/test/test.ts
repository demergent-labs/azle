import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { agent, consumerActor } from './consumer_actor';
import { createActor as createWalletActor } from './dfx_generated/wallet';
import { getTests } from './tests';

const canisterName = 'backend';
const canisterId = getCanisterId(canisterName);
const walletActor = createWalletActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(consumerActor, walletActor, agent), canisterName);
