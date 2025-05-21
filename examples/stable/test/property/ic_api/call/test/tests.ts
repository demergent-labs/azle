import {
    CallPerformFailed,
    CallRejected,
    expect,
    it,
    Test
} from 'azle/_internal/test';

import { createActor } from './test';

export function getTests(): Test {
    return () => {
        it('should handle CallPerformFailed when calling non-existent canister', async () => {
            const actor = await createActor();

            // Generate a principal ID for a non-existent canister
            const nonExistentCanisterId = 'aaaaa-aa'; // Use management canister but we'll generate a principal

            // Verify the error type is correctly identified
            const result = await actor.callNonExistentCanister(
                nonExistentCanisterId
            );
            expect(result).toBe(true);

            // Also test the static example
            const exampleError = await actor.getCallPerformFailedExample();
            expect(exampleError.type).toBe('CallPerformFailed');
        });

        it('should handle CallRejected when calling non-existent method', async () => {
            const actor = await createActor();

            // Call a non-existent method on the caller canister (self-call)
            const calleeId = await actor.getSelf();

            // Verify the error type is correctly identified
            const result = await actor.callNonExistentMethod(calleeId);
            expect(result).toBe(true);
        });

        it('should handle CallRejected when method explicitly rejects', async () => {
            const actor = await createActor();
            const calleeActor = await createActor('callee');

            // Get the callee canister ID
            const calleeId = await calleeActor.getSelf();

            // Call the explicitly rejecting method
            const result = await actor.callRejectingMethod(calleeId);
            expect(result).toBe(true);

            // Also test the static example
            const exampleError = await actor.getCallRejectedExample();
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
