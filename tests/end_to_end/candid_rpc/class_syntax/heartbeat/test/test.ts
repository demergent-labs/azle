import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'heartbeat_end_to_end_test_functional_syntax/test/tests';

import { createActor as createActorHeartbeatAsync } from './dfx_generated/heartbeat_async';
import { createActor as createActorHeartbeatSync } from './dfx_generated/heartbeat_sync';

const heartbeatAsyncCanister = createActorHeartbeatAsync(
    getCanisterId('heartbeat_async'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const heartbeatSyncCanister = createActorHeartbeatSync(
    getCanisterId('heartbeat_sync'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(heartbeatAsyncCanister, heartbeatSyncCanister));
