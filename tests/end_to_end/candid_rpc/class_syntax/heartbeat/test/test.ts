import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'heartbeat_end_to_end_test_functional_syntax/test/tests';

import { createActor as create_actor_heartbeat_async } from './dfx_generated/heartbeat_async';
import { createActor as create_actor_heartbeat_sync } from './dfx_generated/heartbeat_sync';

const heartbeatAsyncCanister = create_actor_heartbeat_async(
    getCanisterId('heartbeat_async'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const heartbeatSyncCanister = create_actor_heartbeat_sync(
    getCanisterId('heartbeat_sync'),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(heartbeatAsyncCanister, heartbeatSyncCanister));
