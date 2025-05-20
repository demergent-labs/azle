import { getCanisterId } from 'azle/_internal/dfx';

import { createActor as createCalleeActor } from './dfx_generated/callee';
import { createActor as createCallerActor } from './dfx_generated/caller';

const callerCanister = createCallerActor(getCanisterId('caller'), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

// We're not using the callee actor directly in the tests, but we need to create it
// so that it's properly deployed for inter-canister calls
createCalleeActor(getCanisterId('callee'), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

const calleeCanisterId = getCanisterId('callee');

describe('Inter-canister call error handling', () => {
    // Test to verify CallPerformFailed when calling a non-existent canister
    test('should handle CallPerformFailed when calling non-existent canister', async () => {
        const result = await callerCanister.callNonExistentCanister();

        expect(result.errorType).toBe('CallPerformFailed');
        expect(result.rejectCode).toBeUndefined();
        expect(result.rejectMessage).toBeUndefined();
    });

    // Test to verify CallRejected when calling a non-existent method
    test('should handle CallRejected when calling non-existent method', async () => {
        const result =
            await callerCanister.callNonExistentMethod(calleeCanisterId);

        expect(result.errorType).toBe('CallRejected');
        expect(result.rejectCode).toBeDefined();
        expect(typeof result.rejectCode).toBe('number');
        expect(result.rejectMessage).toBeDefined();
        expect(typeof result.rejectMessage).toBe('string');
        expect(result.rejectMessage!.length).toBeGreaterThan(0);
    });

    // Test to verify CallRejected when a canister explicitly rejects
    test('should handle CallRejected when canister explicitly rejects', async () => {
        const result =
            await callerCanister.callExplicitReject(calleeCanisterId);

        expect(result.errorType).toBe('CallRejected');
        expect(result.rejectCode).toBeDefined();
        expect(typeof result.rejectCode).toBe('number');
        expect(result.rejectMessage).toBeDefined();
        expect(typeof result.rejectMessage).toBe('string');
        expect(result.rejectMessage).toBe(
            'This call was explicitly rejected by the callee'
        );
    });

    // Test a successful call to ensure the test setup works properly
    test('should successfully call a valid method', async () => {
        const result =
            await callerCanister.callSuccessfulMethod(calleeCanisterId);

        expect(result).toBe('Success!');
    });
});
