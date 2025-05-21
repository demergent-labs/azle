import { Principal } from '@dfinity/principal';
import {
    CallPerformFailed,
    CallRejected,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';

import { _SERVICE as CalleeActor } from './dfx_generated/callee/callee.did';
import { _SERVICE as CallerActor } from './dfx_generated/caller/caller.did';

export function getTests(): Test {
    return () => {
        it('should handle CallPerformFailed when calling non-existent canister', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            // Create a non-existent principal ID
            const nonExistentCanisterId = Principal.fromText('aaaaa-qq');

            // Verify the error type is correctly identified
            const result = await caller.callNonExistentCanister(
                nonExistentCanisterId
            );
            expect(result).toBe(true);

            // Also test the static example
            const exampleError = await caller.getCallPerformFailedExample();
            expect(exampleError.type).toBe('CallPerformFailed');
        });

        it('should handle CallRejected when calling non-existent method', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            // Call a non-existent method on the caller canister (self-call)
            const calleeId = await caller.getSelf();

            // Verify the error type is correctly identified
            const result = await caller.callNonExistentMethod(calleeId);
            expect(result).toBe(true);
        });

        it('should handle CallRejected when method explicitly rejects', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');
            const callee = await getCanisterActor<CalleeActor>('callee');

            // Get the callee canister ID
            const calleeId = await callee.getSelf();

            // Call the explicitly rejecting method
            const result = await caller.callRejectingMethod(calleeId);
            expect(result).toBe(true);

            // Also test the static example
            const exampleError = await caller.getCallRejectedExample();
            expect(exampleError.type).toBe('CallRejected');
            expect(exampleError.rejectCode).toBe(3);
            expect(exampleError.rejectMessage).toBe('Example reject message');
        });

        // Static structure tests for completeness
        it('should verify CallPerformFailed error structure', () => {
            const error: CallPerformFailed = {
                type: 'CallPerformFailed'
            };

            expect(error.type).toBe('CallPerformFailed');
        });

        it('should verify CallRejected error structure', () => {
            const error: CallRejected = {
                type: 'CallRejected',
                rejectCode: 3, // DestinationInvalid
                rejectMessage: 'Example reject message'
            };

            expect(error.type).toBe('CallRejected');
            expect(error.rejectCode).toBe(3);
            expect(error.rejectMessage).toBe('Example reject message');
        });
    };
}
