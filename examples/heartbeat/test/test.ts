import { deploy, run_tests, Test } from 'azle/test';
import { execSync } from 'child_process';
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

const tests: Test[] = [
    {
        name: 'deploy',
        prep: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));

            execSync(`dfx canister uninstall-code heartbeat_async || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx canister uninstall-code heartbeat_sync || true`, {
                stdio: 'inherit'
            });

            execSync(`dfx deploy`, {
                stdio: 'inherit'
            });
        }
    },
    ...get_tests(heartbeat_async_canister, heartbeat_sync_canister)
];

run_tests(tests);
