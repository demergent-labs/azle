import { Principal } from '@dfinity/principal';
import { getCanisterId } from 'azle/_internal/dfx';
import { expect, getCanisterActor, it, Test } from 'azle/_internal/test';

import { _SERVICE as CallerActor } from './dfx_generated/caller/caller.did';

// Define the error types for testing
interface CallPerformFailed {
    type: 'CallPerformFailed';
}

interface CallRejected {
    type: 'CallRejected';
    rejectCode: number;
    rejectMessage: string;
}

export function getTests(): Test {
    return () => {
        it('should setup the callee ID', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');
            const calleeId = Principal.fromText(getCanisterId('callee'));

            await caller.setCalleeId(calleeId);
        });

        it('should validate CallPerformFailed error structure', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            // Get the error structure information
            const result = await caller.getErrorTypeCallPerformFailed();

            // Validate the expected type
            expect(result.errorName).toBe('CallPerformFailed');

            // Create and validate a local instance of the error type
            const error: CallPerformFailed = {
                type: 'CallPerformFailed'
            };
            expect(error.type).toBe('CallPerformFailed');
            expect(Object.keys(error)).toHaveLength(1);
        });

        it('should validate CallRejected error structure', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');

            // Get the error structure information
            const result = await caller.getErrorTypeCallRejected();

            // Validate the expected properties
            expect(result.errorName).toBe('CallRejected');
            expect(typeof result.rejectCode).toBe('number');
            expect(typeof result.rejectMessage).toBe('string');

            // Create and validate a local instance of the error type
            const error: CallRejected = {
                type: 'CallRejected',
                rejectCode: 4,
                rejectMessage: 'Explicitly rejected for testing'
            };
            expect(error.type).toBe('CallRejected');
            expect(error.rejectCode).toBe(4);
            expect(error.rejectMessage).toBe('Explicitly rejected for testing');
            expect(Object.keys(error)).toHaveLength(3);
        });

        it('should succeed when calling a valid method', async () => {
            const caller = await getCanisterActor<CallerActor>('caller');
            const result = await caller.testValidMethodCall();
            expect(result).toBe(true);
        });
    };
}
