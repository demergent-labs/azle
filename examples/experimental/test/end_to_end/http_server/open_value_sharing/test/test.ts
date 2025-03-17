import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { agent, consumerActor } from './consumer_actor';
import { createActor as createWalletActor } from './dfx_generated/wallet';
import { getTests } from './tests';

const canisterName = 'wallet';
const canisterId = getCanisterId(canisterName);
const walletActor = createWalletActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    }
});

runTests(getTests(consumerActor, walletActor, agent));
