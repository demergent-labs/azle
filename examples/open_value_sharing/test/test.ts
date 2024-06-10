import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { agent, consumerActor } from './consumer_actor';
import { createActor as createWalletActor } from './dfx_generated/wallet';
import { getTests } from './tests';

const walletActor = createWalletActor(getCanisterId('wallet'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(consumerActor, walletActor, agent));
