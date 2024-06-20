import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test, wait } from 'azle/test/jest';

import { _SERVICE as _SERVICE_HEARTBEAT_ASYNC } from './dfx_generated/heartbeat_async/heartbeat_async.did';
import { _SERVICE as _SERVICE_HEARTBEAT_SYNC } from './dfx_generated/heartbeat_sync/heartbeat_sync.did';

export function getTests(
    heartbeatAsyncCanister: ActorSubclass<_SERVICE_HEARTBEAT_ASYNC>,
    heartbeatSyncCanister: ActorSubclass<_SERVICE_HEARTBEAT_SYNC>
): Test {
    return () => {
        wait('for first heartbeat to be called', 10_000);

        it('runs an asynchronous heartbeat method', async () => {
            const result = await heartbeatAsyncCanister.getInitialized();

            expect(result).toHaveLength(32);
        });

        it('runs a synchronous heartbeat method', async () => {
            const result = await heartbeatSyncCanister.getInitialized();

            expect(result).toBe(true);
        });
    };
}
