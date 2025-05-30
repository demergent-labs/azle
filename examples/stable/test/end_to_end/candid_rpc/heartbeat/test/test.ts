import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'heartbeat_end_to_end_test_functional_syntax/test/tests';

import { createActor as createActorHeartbeatAsync } from './dfx_generated/heartbeat_async';
import { createActor as createActorHeartbeatSync } from './dfx_generated/heartbeat_sync';

const heartbeatAsyncName = 'heartbeat_async';
const heartbeatAsyncCanister = createActorHeartbeatAsync(
    getCanisterId(heartbeatAsyncName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    }
);

const heartbeatSyncName = 'heartbeat_sync';
const heartbeatSyncCanister = createActorHeartbeatSync(
    getCanisterId(heartbeatSyncName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    }
);

runTests(getTests(heartbeatAsyncCanister, heartbeatSyncCanister));
