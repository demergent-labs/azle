import { run_tests } from 'azle/test';
import { createActor as create_actor_heartbeat_async } from '../test/dfx_generated/heartbeat_async';
import { createActor as create_actor_heartbeat_sync } from '../test/dfx_generated/heartbeat_sync';
import { get_tests } from './tests';

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

run_tests(get_tests(heartbeat_async_canister, heartbeat_sync_canister));
