import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/heartbeat/heartbeat.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(heartbeat_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'Wait for first heartbeat to be called',
            wait: 5000
        },
        {
            name: 'getInitialized',
            test: async () => {
                const result = await heartbeat_canister.getInitialized();

                return {
                    ok: result
                };
            }
        }
    ];
}
