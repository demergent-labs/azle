import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { actorConsumer, agent } from './actor_consumer';
import { createActor as createActorWallet } from './dfx_generated/wallet';
import { getTests } from './tests';

const actorWallet = createActorWallet(getCanisterId('wallet'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(actorConsumer, actorWallet, agent));
