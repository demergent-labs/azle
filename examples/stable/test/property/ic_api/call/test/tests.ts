import { call } from 'azle';
import { expect, it, Test } from 'azle/_internal/test';

export function getTests(): Test {
    return () => {
        // Test for CallPerformFailed error type
        it('should throw CallPerformFailed when calling an invalid canister', async () => {
            try {
                // Use an invalid principal ID to trigger a CallPerformFailed error
                await call<undefined, any>(
                    'aaaaa-invalid-principal-id',
                    'non_existent_method'
                );

                // If we reach here, the test should fail
                expect(true).toBe(false);
            } catch (error: any) {
                // Assert that the error is of type CallPerformFailed
                expect(error.type).toBe('CallPerformFailed');
            }
        });

        // Test for CallRejected error type
        it('should throw CallRejected when calling a valid canister with an invalid method', async () => {
            try {
                // Use the management canister (aaaaa-aa) with a non-existent method
                await call<undefined, any>(
                    'aaaaa-aa',
                    'non_existent_method_name'
                );

                // If we reach here, the test should fail
                expect(true).toBe(false);
            } catch (error: any) {
                // Assert that the error is of type CallRejected
                expect(error.type).toBe('CallRejected');

                // Verify that the reject code is present and is one of the valid codes
                expect(typeof error.rejectCode).toBe('number');

                // Verify that the reject message is a non-empty string
                expect(typeof error.rejectMessage).toBe('string');
                expect(error.rejectMessage.length).toBeGreaterThan(0);
            }
        });
    };
}
