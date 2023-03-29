import { Test } from 'azle/test';
import { _SERVICE as _SERVICE_HEARTBEAT_ASYNC } from './dfx_generated/heartbeat_async/heartbeat_async.did';
import { _SERVICE as _SERVICE_HEARTBEAT_SYNC } from './dfx_generated/heartbeat_sync/heartbeat_sync.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    heartbeatAsyncCanister: ActorSubclass<_SERVICE_HEARTBEAT_ASYNC>,
    heartbeatSyncCanister: ActorSubclass<_SERVICE_HEARTBEAT_SYNC>
): Test[] {
    return [
        {
            name: 'Wait for first heartbeat to be called',
            wait: 10_000
        },
        {
            name: 'getInitialized heartbeatAsync',
            test: async () => {
                const result = await heartbeatAsyncCanister.getInitialized();

                return {
                    Ok: result.length === 32
                };
            }
        },
        {
            name: 'getInitialized heartbeatSync',
            test: async () => {
                const result = await heartbeatSyncCanister.getInitialized();

                return {
                    Ok: result
                };
            }
        }
    ];
}
