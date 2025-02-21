import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { createActor as createActorHeartbeatAsync } from './dfx_generated/heartbeat_async';
import { createActor as createActorHeartbeatSync } from './dfx_generated/heartbeat_sync';
import { getTests } from './tests';

const heartbeatAsyncName = 'heartbeat_async';
const heartbeatAsyncCanister = createActorHeartbeatAsync(
    getCanisterId(heartbeatAsyncName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            shouldFetchRootKey: true
        }
    }
);

const heartbeatSyncName = 'heartbeat_sync';
const heartbeatSyncCanister = createActorHeartbeatSync(
    getCanisterId(heartbeatSyncName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            shouldFetchRootKey: true
        }
    }
);

runTests(getTests(heartbeatAsyncCanister, heartbeatSyncCanister), [
    heartbeatAsyncName,
    heartbeatSyncName
]);
