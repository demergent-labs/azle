import { Test } from 'azle/test';
import { _SERVICE as _SERVICE_HEARTBEAT_ASYNC } from './dfx_generated/heartbeat_async/heartbeat_async.did';
import { _SERVICE as _SERVICE_HEARTBEAT_SYNC } from './dfx_generated/heartbeat_sync/heartbeat_sync.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    heartbeat_async_canister: ActorSubclass<_SERVICE_HEARTBEAT_ASYNC>,
    heartbeat_sync_canister: ActorSubclass<_SERVICE_HEARTBEAT_SYNC>
): Test[] {
    return [
        {
            name: 'Wait for first heartbeat to be called',
            wait: 10_000
        },
        {
            name: 'get_initialized heartbeat_async',
            test: async () => {
                const result = await heartbeat_async_canister.get_initialized();

                return {
                    ok: result.length === 32
                };
            }
        },
        {
            name: 'get_initialized heartbeat_sync',
            test: async () => {
                const result = await heartbeat_sync_canister.get_initialized();

                return {
                    ok: result
                };
            }
        }
    ];
}
