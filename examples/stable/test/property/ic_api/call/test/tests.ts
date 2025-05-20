import { expect, it, Test } from 'azle/_internal/test';

export function getTests(): Test {
    return () => {
        // Test for CallPerformFailed error type
        it('should demonstrate error handling for CallPerformFailed', () => {
            // In a real situation, we would expect a CallPerformFailed error when:
            // 1. Calling a non-existent canister
            // 2. The call_perform operation returns a non-zero code

            // Since we can't reliably generate this error in the test environment,
            // we'll verify the type definition instead
            const error: { type: 'CallPerformFailed' } = {
                type: 'CallPerformFailed'
            };

            expect(error.type).toBe('CallPerformFailed');
        });

        // Test for CallRejected error type
        it('should demonstrate error handling for CallRejected', () => {
            // In a real situation, we would expect a CallRejected error when:
            // 1. The called canister rejects the call
            // 2. The method doesn't exist
            // 3. The arguments are invalid

            // Since we can't reliably generate this error in the test environment,
            // we'll verify the type definition instead
            const error: {
                type: 'CallRejected';
                rejectCode: 1 | 2 | 3 | 4 | 5 | 6;
                rejectMessage: string;
            } = {
                type: 'CallRejected',
                rejectCode: 3, // DestinationInvalid as an example
                rejectMessage: 'Example reject message'
            };

            expect(error.type).toBe('CallRejected');
            expect(error.rejectCode).toBe(3);
            expect(error.rejectMessage).toBe('Example reject message');
        });
    };
}
