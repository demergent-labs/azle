import { run_tests } from 'azle/test';
import { createActor as create_actor_heartbeat_async } from './dfx_generated/heartbeat_async';
import { createActor as create_actor_heartbeat_sync } from './dfx_generated/heartbeat_sync';
import { getTests } from './tests';

const heartbeat_async_canister = create_actor_heartbeat_async(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const heartbeat_sync_canister = create_actor_heartbeat_sync(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

run_tests(getTests(heartbeat_async_canister, heartbeat_sync_canister));
